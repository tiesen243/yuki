import { cookies } from 'next/headers'
import { generateCodeVerifier, generateState, OAuth2RequestError } from 'arctic'

import { db } from '@yuki/db'
import { accounts, users } from '@yuki/db/schema'
import { env } from '@yuki/env'

import type { BaseProvider } from '../providers/base'
import type { SessionResult } from './session'
import { Session } from './session'

type Providers = Record<string, BaseProvider>

export interface AuthOptions<T extends Providers = Providers> {
  cookieKey: string
  providers: T
}

export class Auth<TProviders extends Providers> {
  private readonly db = db
  private readonly session = new Session()

  private readonly COOKIE_KEY: string
  private readonly providers: TProviders

  constructor(options: AuthOptions<TProviders>) {
    this.COOKIE_KEY = options.cookieKey
    this.providers = options.providers
  }

  public async auth(req?: Request): Promise<SessionResult> {
    const authToken =
      (await this.getCookie(req)) ??
      req?.headers.get('Authorization')?.split(' ')[1]

    if (!authToken) return { expires: new Date() }
    return await this.session.validateToken(authToken)
  }

  public async handlers(req: Request): Promise<Response> {
    const url = new URL(req.url)

    let response: Response = Response.json(
      { error: 'Not found' },
      { status: 404 },
    )

    try {
      if (req.method === 'OPTIONS') {
        response = Response.json('', { status: 204 })
      } else if (req.method === 'GET') {
        response = await this.handleGetRequests(req)
      } else if (
        req.method === 'POST' &&
        url.pathname === '/api/auth/sign-out'
      ) {
        await this.signOut(req)
        response = new Response('', {
          headers: new Headers({ Location: '/' }),
          status: 302,
        })
        response.headers.set('Set-Cookie', this.deleteCookie(this.COOKIE_KEY))
      }
    } catch (error) {
      response = this.handleError(error)
    }

    this.setCorsHeaders(response)
    return response
  }

  public async signOut(req?: Request): Promise<void> {
    const token =
      (await this.getCookie(req)) ??
      req?.headers.get('Authorization')?.split(' ')[1]
    if (token) await this.session.invalidateToken(token)
  }

  public middleware(
    callbackFn: (params: {
      request: Request
      session: SessionResult
    }) => Promise<Response> | Response,
  ) {
    return async (req: Request): Promise<Response> => {
      const session = await this.auth(req)
      return callbackFn({ request: req, session })
    }
  }

  private async handleGetRequests(req: Request): Promise<Response> {
    const url = new URL(req.url)
    const path = url.pathname

    if (path === '/api/auth' || path === '/api/auth/') {
      const session = await this.auth(req)
      if (session.user) session.user.password = undefined as unknown as null
      return Response.json(session)
    }

    if (
      path.startsWith('/api/auth/') &&
      path !== '/api/auth' &&
      path !== '/api/auth/'
    )
      return await this.handleOAuthRequest(req)

    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  private async handleOAuthRequest(req: Request): Promise<Response> {
    const url = new URL(req.url)
    const isCallback = url.pathname.endsWith('/callback')

    if (!isCallback) return this.handleOAuthStart(url)
    else return this.handleOAuthCallback(req)
  }

  private handleOAuthStart(url: URL): Response {
    const redirectTo = url.searchParams.get('redirect_to') ?? '/'

    const providerName = String(url.pathname.split('/').pop())
    const provider = this.providers[providerName]
    if (!provider)
      return Response.json({ error: 'Provider not supported' }, { status: 404 })

    if (
      redirectTo.startsWith('exp://') &&
      env.NODE_ENV === 'development' &&
      env.AUTH_PROXY_URL
    ) {
      const redirectUrl = new URL(
        `https://${env.AUTH_PROXY_URL}${url.pathname}`,
      )
      redirectUrl.searchParams.set('redirect_to', redirectTo)
      return this.createRedirectResponse(redirectUrl)
    }

    const state = generateState()
    const codeVerifier = generateCodeVerifier()
    const authorizationUrl = provider.createAuthorizationURL(
      state,
      codeVerifier,
    )

    const response = new Response('', {
      headers: new Headers({ Location: authorizationUrl.toString() }),
      status: 302,
    })
    response.headers.append(
      'Set-Cookie',
      this.setCookie('oauth_state', state, {
        Path: '/',
        HttpOnly: '',
        SameSite: 'Lax',
      }),
    )
    response.headers.append(
      'Set-Cookie',
      this.setCookie('code_verifier', codeVerifier, {
        Path: '/',
        HttpOnly: '',
        SameSite: 'Lax',
      }),
    )
    response.headers.append(
      'Set-Cookie',
      this.setCookie('redirect_to', redirectTo, {
        Path: '/',
        HttpOnly: '',
        SameSite: 'Lax',
      }),
    )

    return response
  }

  private async handleOAuthCallback(req: Request): Promise<Response> {
    const url = new URL(req.url)
    const providerName = String(url.pathname.split('/').slice(-2)[0])
    const provider = this.providers[providerName]

    if (!provider)
      return Response.json({ error: 'Provider not supported' }, { status: 404 })

    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = (await this.getCookie(req, 'oauth_state')) ?? ''
    const codeVerifier = (await this.getCookie(req, 'code_verifier')) ?? ''
    const redirectUri = (await this.getCookie(req, 'redirect_to')) ?? '/'

    if (!code || !state || state !== storedState)
      throw new Error('Invalid state')

    const userData = await provider.fetchUserData(code, codeVerifier)

    const user = await this.createUser({ ...userData, provider: providerName })
    const session = await this.session.create(user.id)

    let redirectLocation = redirectUri
    if (
      redirectUri.startsWith('https://') ||
      redirectUri.startsWith('http://') ||
      redirectUri.startsWith('exp://')
    ) {
      const redirectUrl = new URL(redirectUri, req.url)
      redirectUrl.searchParams.set('token', session.sessionToken)
      redirectLocation = redirectUrl.href
    }

    const response = new Response('', {
      headers: new Headers({ Location: redirectLocation }),
      status: 302,
    })
    response.headers.set(
      'Set-Cookie',
      this.setCookie(this.COOKIE_KEY, session.sessionToken, {
        Path: '/',
        HttpOnly: 'true',
        SameSite: 'Lax',
        Secure: env.NODE_ENV === 'production' ? 'true' : 'false',
        Expires: session.expires.toUTCString(),
      }),
    )
    response.headers.append('Set-Cookie', this.deleteCookie('oauth_state'))
    response.headers.append('Set-Cookie', this.deleteCookie('code_verifier'))
    response.headers.append('Set-Cookie', this.deleteCookie('redirect_to'))

    return response
  }

  private handleError(error: unknown): Response {
    if (error instanceof OAuth2RequestError)
      return Response.json(
        { error: error.message, description: error.description },
        { status: 400 },
      )

    if (error instanceof Error)
      return Response.json({ error: error.message }, { status: 400 })

    return Response.json(
      { error: 'An unknown error occurred' },
      { status: 400 },
    )
  }

  private async createUser(data: {
    provider: string
    providerAccountId: string
    name: string
    email: string
    image: string
  }): Promise<typeof users.$inferSelect> {
    const { provider, providerAccountId, email } = data

    // Check for existing account with this provider
    const existingAccount = await this.db.query.accounts.findFirst({
      where: (accounts, { and, eq }) =>
        and(
          eq(accounts.provider, provider),
          eq(accounts.providerAccountId, providerAccountId),
        ),
      with: { user: true },
    })
    if (existingAccount?.user) return existingAccount.user

    // Check for existing user with this email
    const existingUser = await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    })
    if (existingUser) {
      await this.db.insert(accounts).values({
        provider,
        providerAccountId,
        userId: existingUser.id,
      })
      return existingUser
    }

    return await this.db.transaction(async (tx) => {
      const [newUser] = await tx.insert(users).values(data).returning()
      if (!newUser) throw new Error('Failed to create user')

      await tx.insert(accounts).values({
        provider,
        providerAccountId,
        userId: newUser.id,
      })

      return newUser
    })
  }

  private createRedirectResponse(url: URL): Response {
    return new Response(null, {
      headers: new Headers({ Location: url.toString() }),
      status: 302,
    })
  }

  private async getCookie(
    req?: Request,
    key: string = this.COOKIE_KEY,
  ): Promise<string | undefined> {
    if (req) {
      const cookie = req.headers.get('cookie')
      return cookie ? new RegExp(`${key}=([^;]+)`).exec(cookie)?.[1] : undefined
    }
    return (await cookies()).get(key)?.value
  }

  private setCookie(
    key: string,
    value: string,
    attributes: Record<string, string | number>,
  ): string {
    return `${key}=${value}; ${Object.entries(attributes)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ')}`
  }

  private deleteCookie(key: string): string {
    return `${key}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${
      env.NODE_ENV === 'production' ? 'Secure;' : ''
    }`
  }

  private setCorsHeaders(res: Response): void {
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Request-Method', '*')
    res.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.headers.set('Access-Control-Allow-Headers', '*')
  }
}
