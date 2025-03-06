import type { User } from '@prisma/client'
import type { OAuth2Tokens } from 'arctic'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { generateCodeVerifier, generateState, OAuth2RequestError } from 'arctic'
import { z } from 'zod'

import { db } from '@yuki/db'

import type { SessionResult } from './session'
import { env } from '../env'
import { Password } from './password'
import { Session } from './session'

export interface AuthOptions {
  cookieKey: string
  providers: Providers
}

class AuthClass {
  private readonly db: typeof db
  private readonly session: Session
  private readonly password: Password

  private readonly COOKIE_KEY: string
  private readonly providers: Providers

  constructor(options: AuthOptions) {
    this.COOKIE_KEY = options.cookieKey
    this.providers = options.providers

    this.db = db
    this.session = new Session()
    this.password = new Password()
  }

  public async auth(req?: NextRequest): Promise<SessionResult> {
    let authToken: string | undefined

    if (req)
      authToken =
        req.cookies.get(this.COOKIE_KEY)?.value ??
        req.headers.get('Authorization')?.replace('Bearer ', '')
    else authToken = (await cookies()).get(this.COOKIE_KEY)?.value

    if (!authToken) return { expires: new Date() }

    return await this.session.validateSessionToken(authToken)
  }

  public async handlers(req: NextRequest): Promise<Response> {
    const url = new URL(req.nextUrl)

    let response: NextResponse = NextResponse.json(
      { error: 'Not found' },
      { status: 404 },
    )

    switch (req.method) {
      case 'OPTIONS':
        response = NextResponse.json('', { status: 204 })
        break
      case 'GET':
        if (url.pathname === '/api/auth') {
          const session = await this.auth(req)
          response = NextResponse.json(session)
        } else if (url.pathname.startsWith('/api/auth/oauth')) {
          const isCallback = url.pathname.endsWith('/callback')

          if (!isCallback) {
            const provider =
              this.providers[String(url.pathname.split('/').pop())]

            if (!provider) {
              response = NextResponse.json(
                { error: 'Provider not supported' },
                { status: 404 },
              )
              break
            }
            const state = generateState()
            const codeVerifier = generateCodeVerifier()
            const authorizationUrl = provider.createAuthorizationURL(
              state,
              codeVerifier,
            )

            response = NextResponse.redirect(
              new URL(authorizationUrl, req.nextUrl),
            )
            response.cookies.set('code_verifier', codeVerifier)
            response.cookies.set('oauth_state', state)
          } else {
            const provider =
              this.providers[String(url.pathname.split('/').slice(-2)[0])]
            if (!provider) {
              response = NextResponse.json(
                { error: 'Provider not supported' },
                { status: 404 },
              )
              break
            }

            const code = url.searchParams.get('code')
            const state = url.searchParams.get('state')
            const storedState = req.cookies.get('oauth_state')?.value ?? ''
            const codeVerifier = req.cookies.get('code_verifier')?.value ?? ''

            try {
              if (!code || !state || state !== storedState)
                throw new Error('Invalid state')

              const { validateAuthorizationCode, fetchUserUrl, mapUser } =
                provider

              const verifiedCode = await validateAuthorizationCode(
                code,
                codeVerifier,
              )

              const token = verifiedCode.accessToken()

              const res = await fetch(fetchUserUrl, {
                headers: { Authorization: `Bearer ${token}` },
              })
              if (!res.ok) throw new Error('Failed to fetch user data')

              const user = await this.createUser(
                mapUser((await res.json()) as never),
              )
              const session = await this.session.createSession(user.id)

              response = NextResponse.redirect(new URL('/', req.nextUrl))
              response.cookies.set(this.COOKIE_KEY, session.sessionToken, {
                httpOnly: true,
                path: '/',
                secure: env.NODE_ENV === 'production',
                sameSite: 'lax',
                expires: session.expires,
              })
              response.cookies.delete('oauth_state')
              response.cookies.delete('code_verifier')
            } catch (error) {
              if (error instanceof OAuth2RequestError) {
                response = NextResponse.json(
                  { error: error.message, description: error.description },
                  { status: 400 },
                )
              } else if (error instanceof Error)
                response = NextResponse.json(
                  { error: error.message },
                  { status: 400 },
                )
              else
                response = NextResponse.json(
                  { error: 'An unknown error occurred' },
                  { status: 400 },
                )
            }
          }
        }
        break
      case 'POST':
        if (url.pathname === '/api/auth/sign-out') {
          await this.signOut(req)
          response = NextResponse.redirect(new URL('/', req.url))
          response.cookies.delete(this.COOKIE_KEY)
        }
        break
    }

    this.setCorsHeaders(response)
    return response
  }

  public async signIn(
    type: SignInType,
    data?: z.infer<typeof credentialsSchema>,
  ): Promise<
    | { success: false; fieldErrors: Record<string, string[]> }
    | { success: true; message: string }
    | undefined
  > {
    if (type === 'credentials') {
      const parsedData = credentialsSchema.safeParse(data)
      if (!parsedData.success)
        return {
          success: false,
          fieldErrors: parsedData.error.flatten().fieldErrors,
        }

      const { email, password } = parsedData.data

      const user = await this.db.user.findUnique({ where: { email } })
      if (!user) throw new Error('User not found')
      if (!user.password) throw new Error('User has no password')

      const passwordMatch = this.password.verify(password, user.password)
      if (!passwordMatch) throw new Error('Invalid password')

      const session = await this.session.createSession(user.id)
      ;(await cookies()).set('auth_token', session.sessionToken, {
        httpOnly: true,
        path: '/',
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: session.expires,
      })

      return { success: true, message: 'Signed in' }
    } else {
      redirect(`/api/auth/oauth/${type}`)
    }
  }

  public async signOut(req?: NextRequest): Promise<void> {
    const token = await this.getToken(req)
    await this.session.invalidateSessionToken(token)
  }

  private async getToken(req?: NextRequest): Promise<string> {
    if (req)
      return (
        req.cookies.get(this.COOKIE_KEY)?.value ??
        req.headers.get('Authorization')?.replace('Bearer ', '') ??
        ''
      )
    return (await cookies()).get(this.COOKIE_KEY)?.value ?? ''
  }

  private async createUser(data: {
    provider: string
    providerAccountId: string
    providerAccountName: string
    email: string
    image: string
  }): Promise<User> {
    const { provider, providerAccountId, providerAccountName, email, image } =
      data

    const existingAccount = await db.account.findUnique({
      where: { provider_providerAccountId: { provider, providerAccountId } },
    })

    if (existingAccount) {
      const user = await db.user.findUnique({
        where: { id: existingAccount.userId },
      })
      if (!user) throw new Error(`Failed to sign in with ${provider}`)
      return user
    }

    const accountData = {
      provider,
      providerAccountId,
      providerAccountName,
    }

    return await db.user.upsert({
      where: { email },
      update: { accounts: { create: accountData } },
      create: {
        email,
        name: providerAccountName,
        image,
        accounts: { create: accountData },
      },
    })
  }

  private setCorsHeaders(res: Response): void {
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Request-Method', '*')
    res.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    res.headers.set('Access-Control-Allow-Headers', '*')
  }
}

export const Auth = (options: AuthOptions) => {
  const authInstance = new AuthClass(options)

  return {
    auth: (req?: NextRequest) => authInstance.auth(req),
    signIn: (type: SignInType, data?: z.infer<typeof credentialsSchema>) =>
      authInstance.signIn(type, data),
    signOut: (req?: NextRequest) => authInstance.signOut(req),
    handlers: (req: NextRequest) => authInstance.handlers(req),
  }
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    ),
})

type SignInType = 'credentials' | 'discord' | 'google'
type Providers = Record<
  string,
  {
    createAuthorizationURL: (state: string, codeVerifier: string) => URL
    validateAuthorizationCode: (
      code: string,
      codeVerifier: string,
    ) => Promise<OAuth2Tokens>
    fetchUserUrl: string
    mapUser: (user: never) => {
      provider: string
      providerAccountId: string
      providerAccountName: string
      email: string
      image: string
    }
  }
>
