'use server'

import { cookies } from 'next/headers'
import { Discord, GitHub } from 'arctic'

import type { Session } from './lib/session'
import { env } from './env'
import {
  createSession,
  generateSessionToken,
  invalidateSessionToken,
  validateSessionToken,
} from './lib/session'

const getOAuthConfig = (callbackUrl: string) => ({
  // add more configs based on the OAuth providers you want to use
  // @see https://arcticjs.dev
  discord: {
    instance: new Discord(env.DISCORD_ID, env.DISCORD_SECRET, callbackUrl),
    scopes: ['identify', 'email'],
    fetchUserUrl: 'https://discord.com/api/users/@me',
    mapFn: (data: { id: string; email: string; username: string; avatar: string }) => ({
      id: data.id,
      email: data.email,
      name: data.username,
      image: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`,
    }),
  },
  github: {
    instance: new GitHub(env.GITHUB_ID, env.GITHUB_SECRET, callbackUrl),
    scopes: ['user:email'],
    fetchUserUrl: 'https://api.github.com/user',
    mapFn: (data: { id: string; email: string; login: string; avatar_url: string }) => ({
      id: String(data.id),
      email: data.email,
      name: data.login,
      image: data.avatar_url,
    }),
  },
})

const KEY = 'auth_token'

const auth = async (): Promise<Session> => {
  const token = (await cookies()).get(KEY)?.value ?? ''
  if (!token) return { expires: new Date(Date.now()) }
  return validateSessionToken(token)
}

const signIn = async (userId: string) => {
  const token = generateSessionToken()
  const session = await createSession(token, userId)
  ;(await cookies()).set(KEY, token, {
    httpOnly: true,
    path: '/',
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: session.expiresAt,
  })
}

const signOut = async () => {
  const token = (await cookies()).get(KEY)?.value ?? ''
  if (!token) return

  await invalidateSessionToken(`Bearer ${token}`)
  ;(await cookies()).set(KEY, '', {
    httpOnly: true,
    path: '/',
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
  })
}

export { getOAuthConfig }
export { auth, signIn, signOut }
export type { Session }
