import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { generateCodeVerifier, generateState } from 'arctic'

import { db } from '@yuki/db'

import { OAuthConfig } from '../config'
import { env } from '../env'
import { createSession, invalidateSessionToken, validateSessionToken } from './session'

type Provider = keyof ReturnType<typeof OAuthConfig>

const setCorsHeaders = (res: Response) => {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Request-Method', '*')
  res.headers.set('Access-Control-Allow-Methods', 'OPTIONS,GET,POST')
  res.headers.set(
    'Access-Control-Allow-Headers',
    'authorization,accept,content-type,trpc-accept,x-trpc-source',
  )
}

const AUTH_KEY = 'auth_token'

const OPTIONS = () => {
  const response = new Response(null, { status: 204 })
  setCorsHeaders(response)
  return response
}

const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ auth?: [string, string] }> },
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

  const [provider, isCallback] = auth.map((segment) => segment.toLowerCase()) as [
    Provider,
    string,
  ]

  try {
    const providers = OAuthConfig(`${nextUrl.origin}/api/auth/${provider}/callback`)
    if (!Object.keys(providers).includes(provider))
      throw new Error(`Provider "${provider}" is not supported`)
    const { ins, scopes, fetchUserUrl, mapFn } = providers[provider]

    if (!isCallback) {
      const state = generateState()
      const codeVerifier = generateCodeVerifier()

      const url: URL = ins.createAuthorizationURL(
        state, // @ts-expect-error - some provider require codeVerifier
        ins.createAuthorizationURL.length === 3 ? codeVerifier : scopes,
        scopes,
      )

      nextCookies.set('oauth_state', state)
      nextCookies.set('oauth_code_verifier', codeVerifier)
      const response = NextResponse.redirect(new URL(url, nextUrl))
      setCorsHeaders(response)
      return response
    }

    const code = nextUrl.searchParams.get('code') ?? ''
    const state = nextUrl.searchParams.get('state') ?? ''

    const storedState = req.cookies.get('oauth_state')?.value ?? ''
    const storedCodeVerifier = req.cookies.get('oauth_code_verifier')?.value ?? ''

    if (!code || !state || state !== storedState) throw new Error('Invalid state')

    const verifiedCode =
      ins.validateAuthorizationCode.length === 2
        ? await ins.validateAuthorizationCode(code, storedCodeVerifier)
        : await ins.validateAuthorizationCode(code, '')
    const token = verifiedCode.accessToken()

    const r = await fetch(fetchUserUrl, { headers: { Authorization: `Bearer ${token}` } })
    if (!r.ok) throw new Error(`Failed to fetch user data from ${provider}`)
    const user = await createUser({ ...mapFn((await r.json()) as never), provider })

    const session = await createSession(user.id)

    nextCookies.set(AUTH_KEY, session.token, {
      httpOnly: true,
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      expires: session.expiresAt,
    })
    nextCookies.delete('oauth_state')
    nextCookies.delete('oauth_code_verifier')

    const response = NextResponse.redirect(new URL('/', nextUrl))
    setCorsHeaders(response)
    return response
  } catch (e) {
    if (e instanceof Error)
      return NextResponse.json({ error: e.message }, { status: 401 })
    else return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}

const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ auth?: [string, string] }> },
) => {
  const nextUrl = new URL(req.url)
  const nextCookies = await cookies()

  const { auth } = await params
  if (!auth)
    return NextResponse.json({ message: 'No auth parameters provided' }, { status: 404 })

  if (auth.at(0) === 'sign-out') {
    const token =
      nextCookies.get(AUTH_KEY)?.value ??
      req.headers.get('Authorization')?.replace('Bearer ', '') ??
      ''

    try {
      await invalidateSessionToken(token)
      nextCookies.delete(AUTH_KEY)

      const response = NextResponse.redirect(new URL('/', nextUrl))
      setCorsHeaders(response)
      return response
    } catch {
      return NextResponse.json({ message: 'Sign out fail' }, { status: 500 })
    }
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

export const handlers = { GET, POST, OPTIONS }
