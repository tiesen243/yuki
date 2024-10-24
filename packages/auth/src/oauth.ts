import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Discord, generateState, OAuth2RequestError } from 'arctic'

import { authEnv } from '@yuki/auth/env'
import { db } from '@yuki/db'

import { lucia } from './lucia'

export const discord = (redirectUri: string) => {
  const discord = new Discord(authEnv.DISCORD_CLIENT_ID, authEnv.DISCORD_CLIENT_SECRET, redirectUri)

  return async (req: NextRequest) => {
    const state = generateState()

    // store redirect url in cookie
    const ur = new URL(req.url)
    cookies().set(
      'redirect',
      String(ur.searchParams.get('redirect') === 'null' ? '/' : ur.searchParams.get('redirect')),
    )

    const url = await discord.createAuthorizationURL(state, {
      scopes: ['identify', 'email'],
    })

    cookies().set('discord_oauth_state', state, {
      path: '/',
      secure: authEnv.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: 'lax',
    })

    return NextResponse.redirect(new URL(url, req.url))
  }
}

export const discordCallback = (callbackUrl: string) => {
  const discord = new Discord(authEnv.DISCORD_CLIENT_ID, authEnv.DISCORD_CLIENT_SECRET, callbackUrl)

  return async (req: NextRequest) => {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = req.cookies.get('discord_oauth_state')?.value ?? null
    if (!code || !state || state !== storedState)
      return NextResponse.json({ message: 'Invalid state' }, { status: 400 })

    const redirectUrl = cookies().get('redirect')?.value ?? '/'

    // clear cookies
    cookies().delete('discord_oauth_state')
    cookies().delete('redirect')

    try {
      const tokens = await discord.validateAuthorizationCode(code)
      const discordRes = (await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      }).then((res) => res.json())) as DiscordUser

      const discordUser = {
        id: discordRes.id,
        username: discordRes.username,
        avatar: `https://cdn.discordapp.com/avatars/${discordRes.id}/${discordRes.avatar}.png`,
      }

      // check if user exists in database
      const existedUser = await db.user.findFirst({
        where: { OR: [{ discord: { is: { id: discordUser.id } } }, { email: discordRes.email }] },
      })
      if (existedUser) {
        // update user's discord info
        await db.user.update({ where: { id: existedUser.id }, data: { discord: discordUser } })

        const session = await lucia.createSession(existedUser.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, {
          ...sessionCookie.attributes,
          domain: authEnv.VERCEL_PROJECT_PRODUCTION_URL?.replace('dashboard.', '') ?? 'localhost',
        })

        return NextResponse.redirect(new URL(redirectUrl, req.url))
      }

      const newUser = await db.user.create({
        data: { discord: discordUser, email: discordRes.email, name: discordRes.global_name },
      })

      const session = await lucia.createSession(newUser.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        domain: new URL(String(authEnv.VERCEL_PROJECT_PRODUCTION_URL)).hostname,
      })

      return NextResponse.redirect(new URL(redirectUrl, req.url))
    } catch (e) {
      if (e instanceof OAuth2RequestError)
        return NextResponse.json(
          { message: e.message, description: e.description },
          { status: 400 },
        )
      if (e instanceof Error) return NextResponse.json({ message: e.message }, { status: 500 })
      return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
    }
  }
}

interface DiscordUser {
  id: string
  email: string
  username: string
  global_name: string
  avatar: string
}
