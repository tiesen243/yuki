import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { generateState } from '@yuki/auth/lucia'

import { discord } from '@/app/api/auth/discord/core'
import { env } from '@/env'

export const GET = async (req: NextRequest) => {
  const state = generateState()

  // store redirect url in cookie
  const ur = new URL(req.url)
  const redirect = ur.searchParams.get('redirect') ?? '/'
  cookies().set('redirect', redirect)

  const url = await discord.createAuthorizationURL(state, {
    scopes: ['identify', 'email'],
  })

  cookies().set('discord_oauth_state', state, {
    path: '/',
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  return NextResponse.redirect(new URL(url, req.url))
}
