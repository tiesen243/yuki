import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Discord, generateState, OAuth2RequestError } from 'arctic'

import { authEnv } from '@yuki/auth/env'
import { lucia } from '@yuki/auth/lucia'
import { db } from '@yuki/db'

export const discordAuth = (callbackUrl: string) => {
  const discord = new Discord(authEnv.DISCORD_CLIENT_ID, authEnv.DISCORD_CLIENT_SECRET, callbackUrl)

  return async (req: NextRequest) => {
    const state = generateState()
    const scopes = ['email', 'identify']
    const url = discord.createAuthorizationURL(state, scopes)

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
    try {
      const url = new URL(req.url)
      const code = url.searchParams.get('code') ?? ''
      const state = url.searchParams.get('state') ?? ''
      const storedState = req.cookies.get('discord_oauth_state')?.value ?? ''
      cookies().delete('discord_oauth_state')
      if (!code || !state || state !== storedState) throw new Error('Invalid state')

      const tokens = await discord.validateAuthorizationCode(code)
      const accessToken = tokens.accessToken()

      const response = await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json() as Promise<DiscordUser>)
        .then((user) => ({
          discordId: user.id,
          email: user.email,
          username: user.username,
          name: user.global_name,
          avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
        }))
        .catch(() => {
          throw new Error('Failed to fetch user data from Discord')
        })

      let user = await db.user.findFirst({
        where: { OR: [{ discordId: response.discordId }, { email: response.email }] },
      })
      if (!user) user = await db.user.create({ data: response })
      else user = await db.user.update({ where: { id: user.id }, data: response })

      const session = await lucia.createSession(user.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        domain: callbackUrl.replace('dashboard.', ''),
      })

      return NextResponse.redirect(new URL('/', req.url))
    } catch (e) {
      if (e instanceof OAuth2RequestError)
        return NextResponse.json({ error: e.message }, { status: Number(e.code) })
      else if (e instanceof Error) return NextResponse.json({ error: e.message }, { status: 500 })
      else return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
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
