import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { lucia, OAuth2RequestError } from '@yuki/auth/lucia'
import { db } from '@yuki/db'

import { discord } from '@/app/api/auth/discord/core'
import { getWebsiteUrl } from '@/lib/utils'

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = req.cookies.get('discord_oauth_state')?.value ?? null
  if (!code || !state || state !== storedState)
    return NextResponse.json({ message: 'Invalid state' }, { status: 400 })

  const redirectUri = cookies().get('redirect')?.value ?? '/'

  cookies().delete('discord_oauth_state')
  cookies().delete('redirect')

  try {
    const tokens = await discord.validateAuthorizationCode(code)
    const discordUserRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    })
    const discordRes = (await discordUserRes.json()) as DiscordUser & {
      email: string
      global_name: string
    }

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
      await db.user.update({ where: { id: existedUser.id }, data: { discord: discordUser } })

      const session = await lucia.createSession(existedUser.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        domain: new URL(getWebsiteUrl()).hostname,
      })

      return NextResponse.redirect(new URL(redirectUri, req.url))
    }

    const newUser = await db.user.create({
      data: { discord: discordUser, email: discordRes.email, name: discordRes.global_name },
    })

    const session = await lucia.createSession(newUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      domain: new URL(getWebsiteUrl()).hostname,
    })

    return NextResponse.redirect(new URL(redirectUri, req.url))
  } catch (e) {
    if (e instanceof OAuth2RequestError)
      return NextResponse.json({ message: e.message, description: e.description }, { status: 400 })
    if (e instanceof Error) return NextResponse.json({ message: e.message }, { status: 500 })
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}

interface DiscordUser {
  id: string
  username: string
  avatar: string
}
