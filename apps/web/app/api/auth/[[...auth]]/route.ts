import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { generateState, OAuth2RequestError } from 'arctic'

import {
  createSession,
  invalidateSessionToken,
  OAuthConfig,
  validateSessionToken,
  verifyHashedPassword,
} from '@yuki/auth'
import { db } from '@yuki/db'

import { env } from '@/env'

type Provider = 'credentials' | 'sign-out' | 'discord' | 'github'

const cookieAttributes = (expires: Date) => ({
  httpOnly: true,
  path: '/',
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  expires,
})

const setCorsHeaders = (res: Response) => {
  res.headers.set(
    'Access-Control-Allow-Origin',
    String(env.NEXT_PUBLIC_DASHBOARD_URL ?? 'http://localhost:3001'),
  )
  res.headers.set('Access-Control-Request-Method', '*')
  res.headers.set('Access-Control-Allow-Methods', 'OPTIONS,GET,POST')
  res.headers.set(
    'Access-Control-Allow-Headers',
    'authorization,accept,content-type,trpc-accept,x-trpc-source',
  )
}

const AUTH_KEY = 'auth_token'

export const OPTIONS = () => {
  const response = new Response(null, { status: 204 })
  setCorsHeaders(response)
  return response
}

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ auth?: [Provider, string] }> },
) => {
  const nextUrl = new URL(req.url)
  const nextCookies = await cookies()
  const { auth } = await params

  if (!auth) {
    const token =
      nextCookies.get(AUTH_KEY)?.value ??
      req.headers.get('Authorization')?.replace('Bearer ', '') ??
      ''

    const session = await validateSessionToken(token)

    const response = NextResponse.json(session)
    setCorsHeaders(response)
    return response
  }

  const [provider, isCallback] = auth

  try {
    if (provider === 'credentials') {
      const [email, password] = [
        nextUrl.searchParams.get('email') ?? '',
        nextUrl.searchParams.get('password') ?? '',
      ]

      const user = await db.user.findUnique({ where: { email } })
      if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })
      if (!user.password)
        return NextResponse.json({ message: 'User have no password' }, { status: 401 })
      const isValid = await verifyHashedPassword(user.password, password)
      if (!isValid)
        return NextResponse.json({ message: 'Password is invalid!' }, { status: 401 })

      const session = await createSession(user.id)
      nextCookies.set(AUTH_KEY, session.token, cookieAttributes(session.expiresAt))

      const response = NextResponse.json({ meesage: 'Login success', session })
      setCorsHeaders(response)
      return response
    }

    if (provider === 'sign-out') {
      const token =
        nextCookies.get(AUTH_KEY)?.value ??
        req.headers.get('Authorization')?.replace('Bearer ', '') ??
        ''

      try {
        await invalidateSessionToken(token)
        nextCookies.delete(AUTH_KEY)

        let response: NextResponse
        if (nextUrl.searchParams.get('dashboard') === 'true')
          response = NextResponse.json({ message: 'Sign out successfully' })
        else response = NextResponse.redirect(new URL('/', nextUrl))
        setCorsHeaders(response)
        return response
      } catch {
        return NextResponse.json({ message: 'Sign out fail' }, { status: 500 })
      }
    }

    const providers = OAuthConfig(`${nextUrl.origin}/api/auth/${provider}/callback`)
    const { ins1, ins2, scopes, fetchUserUrl, mapFn } = providers[provider]
    if (!fetchUserUrl) throw new Error(`Provider "${provider}" is not supported`)

    if (!isCallback) {
      const state = generateState()

      let url: URL
      if (ins1) url = ins1.createAuthorizationURL(state, scopes)
      else url = ins2.createAuthorizationURL(state, null, scopes)

      nextCookies.set('oauth_state', state)
      const response = NextResponse.redirect(new URL(url, nextUrl))
      setCorsHeaders(response)
      return response
    }

    const code = nextUrl.searchParams.get('code') ?? ''
    const state = nextUrl.searchParams.get('state') ?? ''
    const storedState = req.cookies.get('oauth_state')?.value
    if (!code || !state || state !== storedState) throw new Error('Invalid state')

    let c = undefined
    if (ins1) c = await ins1.validateAuthorizationCode(code)
    else c = await ins2.validateAuthorizationCode(code, null)
    const token = c.accessToken()

    const r = await fetch(fetchUserUrl, { headers: { Authorization: `Bearer ${token}` } })
    if (!r.ok) throw new Error(`Failed to fetch user data from ${provider}`)
    const user = await createUser({ ...mapFn((await r.json()) as never), provider })

    const session = await createSession(user.id)

    nextCookies.set(AUTH_KEY, session.token, cookieAttributes(session.expiresAt))
    nextCookies.delete('oauth_state')

    const response = NextResponse.redirect(new URL('/', nextUrl))
    setCorsHeaders(response)
    return response
  } catch (e) {
    if (e instanceof OAuth2RequestError)
      return NextResponse.json({ error: e.message }, { status: Number(e.code) })
    else if (e instanceof Error)
      return NextResponse.json({ error: e.message }, { status: 500 })
    else return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}

const createUser = async (p: {
  provider: Provider
  providerId: string
  email: string
  name: string
  image: string
}) => {
  const { provider, providerId, email, name, image } = p

  const existingAccount = await db.account.findUnique({
    where: { provider_providerId: { provider, providerId } },
  })

  if (existingAccount) {
    const user = await db.user.findUnique({ where: { id: existingAccount.userId } })
    if (!user) throw new Error(`Failed to sign in with ${provider}`)
    return user
  }

  const accountData = {
    provider,
    providerId,
    name,
  }
  return await db.user.upsert({
    where: { email },
    update: { accounts: { create: accountData } },
    create: {
      email,
      name,
      image,
      accounts: { create: accountData },
    },
  })
}
