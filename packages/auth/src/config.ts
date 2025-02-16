'use server'

import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { sha256 } from '@oslojs/crypto/sha2'
import { encodeHexLowerCase } from '@oslojs/encoding'
import { Discord, GitHub, Google } from 'arctic'

import type { Session } from './lib/session'
import { env } from './env'
import { AUTH_KEY } from './lib/constants'
import { validateSessionToken } from './lib/session'

const OAuthConfig = (callbackUrl: string) => ({
  /**
   * OAuth Provider Configuration
   *
   * @remarks
   * - ins: create a new instance for OAuth provider
   * - scopes: authentication permissions for user identification and email
   * - fetchUserUrl: OAuth API endpoint to get user data
   * - mapFn: Maps OAuth user data to database account schema
   *
   * @see https://arcticjs.dev
   */
  discord: {
    ins: new Discord(env.DISCORD_ID, env.DISCORD_SECRET, callbackUrl),
    scopes: ['identify', 'email'],
    fetchUserUrl: 'https://discord.com/api/users/@me',
    mapFn: (data: { id: string; email: string; username: string; avatar: string }) => ({
      providerId: data.id,
      email: data.email,
      name: data.username,
      image: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`,
    }),
  },
  github: {
    ins: new GitHub(env.GITHUB_ID, env.GITHUB_SECRET, callbackUrl),
    scopes: ['user:email'],
    fetchUserUrl: 'https://api.github.com/user',
    mapFn: (data: { id: number; email: string; login: string; avatar_url: string }) => ({
      providerId: String(data.id),
      email: data.email,
      name: data.login,
      image: data.avatar_url,
    }),
  },
  google: {
    ins: new Google(env.GOOGLE_ID, env.GOOGLE_SECRET, callbackUrl),
    scopes: ['openid', 'profile', 'email'],
    fetchUserUrl: 'https://openidconnect.googleapis.com/v1/userinfo',
    mapFn: (data: { sub: string; email: string; name: string; picture: string }) => ({
      providerId: data.sub,
      email: data.email,
      name: data.name,
      image: data.picture,
    }),
  },
})

const auth = async (req?: NextRequest): Promise<Session> => {
  const token =
    req?.cookies.get(AUTH_KEY)?.value ?? (await cookies()).get(AUTH_KEY)?.value ?? ''

  if (!token) return { expires: new Date(Date.now()) }
  return validateSessionToken(token)
}

const generateGravatar = (email: string): string =>
  encodeHexLowerCase(sha256(new TextEncoder().encode(email)))

export { auth, OAuthConfig, generateGravatar }
export type { Session }
