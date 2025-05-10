import { generateCodeVerifier, generateState, OAuth2RequestError } from 'arctic'

import type { AuthOptions, Providers, SessionResult } from '../types'
import { SESSION_COOKIE_NAME } from '../config'
import { deleteCookie, getCookie, setCookie } from './cookies'
import {
  createSession,
  createUser,
  signIn,
  signOut,
  validateToken,
} from './queries'

/**
 * Creates an authentication handler with OAuth providers
 *
 * @description
 * The Auth function creates a complete authentication system with OAuth providers.
 * It handles OAuth flows (login initiation and callback), session management,
 * and provides HTTP handlers for authentication operations.
 *
 * @param providers - Configuration object containing OAuth provider settings
 *
 * @returns Authentication handlers and utility functions:
 *  - auth: Function to verify authentication status
 *  - signIn: Function to authenticate users with email/password
 *  - signOut: Function to end user sessions
 *  - handlers: HTTP handlers for auth routes (GET/POST)
 *    - GET: Handles OAuth flow and session validation
 *    - POST: Handles email/password signin and signout
 *
 * @example
 * ```typescript
 * // Create authentication handler with Google provider
 * const authHandler = Auth({
 *   google: new Google(),
 * })
 *
 * // Use in API route
 * export const { GET, POST } = authHandler.handlers
 * ```
 */
export function Auth<TProviders extends Providers>(
  providers: AuthOptions<TProviders>,
) {
  /**
   * Authenticates a request by validating the session token
   *
   * @param request - Optional request object to extract the session token from
   * @returns Promise resolving to a SessionResult with user information if authenticated
   *
   * @example
   * // Authenticate the current request
   * const session = await auth();
   *
   * @example
   * // Authenticate with a specific request
   * const session = await auth(request);
   */
  async function auth(request?: Request): Promise<SessionResult> {
    const token =
      (await getCookie(SESSION_COOKIE_NAME, request)) ??
      request?.headers.get('Authorization')?.replace('Bearer ', '') ??
      ''
    return validateToken(token)
  }

  /**
   * Creates a HTTP 302 redirect response with the specified URL
   * @param url - The destination URL to redirect to (string or URL object)
   * @returns A Response object configured for redirection
   */
  const createRedirectResponse = (url: string | URL): Response =>
    new Response(null, {
      status: 302,
      headers: { location: url.toString() },
    })

  /**
   * Handles the initial OAuth flow by generating authorization URL and setting cookies
   * @param req - Incoming request
   * @returns Redirect response to the provider's authorization URL
   * @throws Error if provider is not supported or configuration is invalid
   */
  const handleOAuthStart = async (req: Request): Promise<Response> => {
    const url = new URL(req.url)
    const redirectTo = url.searchParams.get('redirect_to') ?? '/'
    const providerName = String(url.pathname.split('/').pop())
    const provider = providers[providerName]
    if (!provider) throw new Error(`Provider ${providerName} is not supported`)

    // Handle mobile development redirects
    if (
      redirectTo.startsWith('exp://') &&
      process.env.NODE_ENV === 'development'
    ) {
      if (!process.env.AUTH_PROXY_URL)
        throw new Error('AUTH_PROXY_URL is not set')

      const redirectUrl = new URL(
        `https://${process.env.AUTH_PROXY_URL}${url.pathname}`,
      )
      redirectUrl.searchParams.set('redirect_to', redirectTo)
      return createRedirectResponse(redirectUrl)
    }

    // Generate OAuth parameters and create authorization URL
    const state = generateState()
    const codeVerifier = generateCodeVerifier()
    const authorizationUrl = provider.createAuthorizationURL(
      state,
      codeVerifier,
    )

    // Set cookies for the callback and create response
    const response = createRedirectResponse(authorizationUrl)
    const cookieOptions = { maxAge: 60 * 5 } // 5 minutes
    await Promise.all([
      setCookie('auth_state', state, cookieOptions, response),
      setCookie('code_verifier', codeVerifier, cookieOptions, response),
      setCookie('redirect_to', redirectTo, cookieOptions, response),
    ])

    return response
  }

  /**
   * Handles the OAuth callback by verifying state, exchanging code for tokens,
   * creating user session, and setting session cookies
   * @param req - Incoming request with OAuth code and state
   * @returns Redirect response to the original destination with session
   * @throws Error if required parameters are missing or validation fails
   */
  const handleOAuthCallback = async (req: Request): Promise<Response> => {
    const url = new URL(req.url)
    const providerName = String(url.pathname.split('/').slice(-2, -1))
    const provider = providers[providerName]
    if (!provider) throw new Error(`Provider ${providerName} is not supported`)

    // Get parameters from URL and cookies
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = await getCookie('auth_state', req)
    const storedCode = await getCookie('code_verifier', req)
    const redirectTo = (await getCookie('redirect_to', req)) ?? '/'

    if (!code || !state || !storedState || !storedCode)
      throw new Error('Missing required parameters')

    // Fetch user data and create session
    const userData = await provider.fetchUserData(code, storedCode)
    const user = await createUser({ ...userData, provider: providerName })
    const sessionCookie = await createSession(user.id)

    // Create response and handle cross-origin redirects
    const redirectUrl = new URL(redirectTo, req.url)
    if (redirectUrl.origin !== url.origin)
      redirectUrl.searchParams.set('token', sessionCookie.sessionToken)

    const response = createRedirectResponse(redirectUrl)

    // Set session cookie and clear temporary cookies
    await setCookie(
      SESSION_COOKIE_NAME,
      sessionCookie.sessionToken,
      { expires: sessionCookie.expires },
      response,
    )

    await Promise.all([
      deleteCookie('auth_state', response),
      deleteCookie('code_verifier', response),
      deleteCookie('redirect_to', response),
    ])

    return response
  }

  /**
   * Handles GET requests for authentication flows
   * @param req - Incoming request
   * @returns Response based on the requested auth operation
   */
  const handleGetRequest = async (req: Request): Promise<Response> => {
    const url = new URL(req.url)
    const pathName = url.pathname

    try {
      // User session verification endpoint
      if (pathName === '/api/auth') {
        const session = await auth(req)
        if (session.user) {
          session.user.password = undefined as unknown as null
        }
        return Response.json(session)
      }

      // OAuth flow endpoints
      return url.pathname.endsWith('/callback')
        ? await handleOAuthCallback(req)
        : await handleOAuthStart(req)
    } catch (error) {
      const errorMessage =
        error instanceof OAuth2RequestError
          ? { error: error.message, description: error.description }
          : error instanceof Error
            ? { error: error.message }
            : { error: 'Internal Server Error' }
      const status = error instanceof OAuth2RequestError ? 400 : 500
      return Response.json(errorMessage, { status })
    }
  }

  /**
   * Handles POST requests for authentication operations
   * @param req - Incoming request
   * @returns Response based on the requested auth operation
   */
  const handlePostRequest = async (req: Request): Promise<Response> => {
    const { pathname } = new URL(req.url)

    try {
      // Sign-in endpoint
      if (pathname === '/api/auth/sign-in') {
        const { email, password } = (await req.json()) as {
          email: string
          password: string
        }
        const { sessionToken, expires } = await signIn({ email, password })

        const response = Response.json({ token: sessionToken }, { status: 200 })
        await setCookie(
          SESSION_COOKIE_NAME,
          sessionToken,
          { expires },
          response,
        )
        return response
      }

      // Sign-out endpoint
      if (pathname === '/api/auth/sign-out') {
        await signOut(req)
        const response = createRedirectResponse('/')
        await deleteCookie(SESSION_COOKIE_NAME, response)
        return response
      }

      return new Response('Not Found', { status: 404 })
    } catch (error) {
      if (error instanceof Error)
        return Response.json({ error: error.message }, { status: 401 })
      return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }

  /**
   * Wraps handler functions with CORS headers
   * @param handler - Request handler function
   * @returns Handler function with CORS headers applied to response
   */
  const withCors = (handler: (req: Request) => Promise<Response>) => {
    return async (req: Request) => {
      const response = await handler(req)
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Request-Method', '*')
      response.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
      response.headers.set('Access-Control-Allow-Headers', '*')
      return response
    }
  }

  return {
    auth,
    signIn,
    signOut,
    handlers: {
      GET: withCors(handleGetRequest),
      POST: withCors(handlePostRequest),
    },
  }
}
