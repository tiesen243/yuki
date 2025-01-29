import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { OAuth2RequestError } from 'arctic'

import { auth } from '../config'
import { env } from '../env'
import { OAuth } from './OAuth'
import { createSession } from './session'

export const handlers = async (
  req: NextRequest,
  { params }: { params: Promise<{ auth: [string, string] }> },
) => {
  const nextUrl = new URL(req.url)

  const [provider, isCallback] = (await params).auth
  const callbackUrl = `${nextUrl.origin}/api/auth/${provider}/callback`

  if (provider === 'getSession') return NextResponse.json(await auth())

  try {
    const authProvider = new OAuth(provider, callbackUrl)

    if (!isCallback) {
      const { url, state } = authProvider.getOAuthUrl()
      ;(await cookies()).set('oauth_state', state)

      return NextResponse.redirect(new URL(`${url}`, nextUrl))
    }

    const user = await authProvider.callback(
      nextUrl,
      req.cookies.get('oauth_state')?.value,
    )
    const { token, expiresAt } = await createSession(user.id)
    ;(await cookies()).set('auth_token', token, {
      httpOnly: true,
      path: '/',
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
    })
    ;(await cookies()).delete('oauth_state')

    return NextResponse.redirect(new URL('/', nextUrl))
  } catch (e) {
    if (e instanceof OAuth2RequestError)
      return NextResponse.json({ error: e.message }, { status: Number(e.code) })
    else if (e instanceof Error)
      return NextResponse.json({ error: e.message }, { status: 500 })
    else return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}
