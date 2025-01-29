'use server'

import { cookies } from 'next/headers'
import { sha256 } from '@oslojs/crypto/sha2'
import { encodeHexLowerCase } from '@oslojs/encoding'
import { Discord, GitHub } from 'arctic'

import type { Session } from './lib/session'
import { env } from './env'
import { validateSessionToken } from './lib/session'

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

const generateGravatar = (email: string): string =>
  encodeHexLowerCase(sha256(new TextEncoder().encode(email)))

export { auth, getOAuthConfig, generateGravatar }
export type { Session }
