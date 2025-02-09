'use server'

import { cookies } from 'next/headers'
import { sha256 } from '@oslojs/crypto/sha2'
import { encodeHexLowerCase } from '@oslojs/encoding'
import { Discord, GitHub } from 'arctic'

import type { Session } from './lib/session'
import { env } from './env'
import { AUTH_KEY } from './lib/constants'
import { validateSessionToken } from './lib/session'

const getOAuthConfig = (callbackUrl: string) => ({
  /** add more configs based on the OAuth providers you want to use
   * NOTE: mapFn is used for map user data form OAuth to database account schema
   *
   * @see https://arcticjs.dev
   */
  discord: {
    ins1: null,
    ins2: new Discord(env.DISCORD_ID, env.DISCORD_SECRET, callbackUrl),
    scopes: ['identify', 'email'],
    fetchUserUrl: 'https://discord.com/api/users/@me', // @see https://discord.com/developers/docs/resources/user#get-current-user
    mapFn: (data: { id: string; email: string; username: string; avatar: string }) => ({
      providerId: data.id,
      email: data.email,
      name: data.username,
      image: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`,
    }),
  },
  github: {
    ins1: new GitHub(env.GITHUB_ID, env.GITHUB_SECRET, callbackUrl),
    ins2: null,
    scopes: ['user:email'],
    fetchUserUrl: 'https://api.github.com/user', // @see https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
    mapFn: (data: { id: string; email: string; login: string; avatar_url: string }) => ({
      providerId: String(data.id),
      email: data.email,
      name: data.login,
      image: data.avatar_url,
    }),
  },
})

const auth = async (): Promise<Session> => {
  const token = (await cookies()).get(AUTH_KEY)?.value ?? ''
  if (!token) return { expires: new Date(Date.now()) }
  return validateSessionToken(token)
}

const generateGravatar = (email: string): string =>
  encodeHexLowerCase(sha256(new TextEncoder().encode(email)))

export { auth, getOAuthConfig, generateGravatar }
export type { Session }
