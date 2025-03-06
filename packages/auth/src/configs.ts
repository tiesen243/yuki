'use server'

import { Discord, Google } from 'arctic'

import type { AuthOptions } from './utils/auth'
import { env } from './env'
import { Auth } from './utils/auth'

const getBaseUrl = () => {
  if (env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

const discord = new Discord(
  env.DISCORD_CLIENT_ID,
  env.DISCORD_CLIENT_SECRET,
  `${getBaseUrl()}/api/auth/oauth/discord/callback`,
)

const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  `${getBaseUrl()}/api/auth/oauth/google/callback`,
)

const authOptions = {
  cookieKey: 'auth_token',
  providers: {
    discord: {
      createAuthorizationURL: (state, codeVerifier) =>
        discord.createAuthorizationURL(state, codeVerifier, [
          'identify',
          'email',
        ]),
      validateAuthorizationCode: (code, codeVerifier) =>
        discord.validateAuthorizationCode(code, codeVerifier),
      fetchUserUrl: 'https://discord.com/api/users/@me',
      mapUser: (user: {
        id: string
        email: string
        username: string
        avatar: string
      }) => ({
        provider: 'discord',
        providerAccountId: user.id,
        providerAccountName: user.username,
        email: user.email,
        image: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
      }),
    },
    google: {
      createAuthorizationURL: (state, codeVerifier) =>
        google.createAuthorizationURL(state, codeVerifier, [
          'openid',
          'profile',
          'email',
        ]),
      validateAuthorizationCode: (code, codeVerifier) =>
        google.validateAuthorizationCode(code, codeVerifier),
      fetchUserUrl: 'https://openidconnect.googleapis.com/v1/userinfo',
      mapUser: (user: {
        sub: string
        email: string
        name: string
        picture: string
      }) => ({
        provider: 'google',
        providerAccountId: user.sub,
        providerAccountName: user.name,
        email: user.email,
        image: user.picture,
      }),
    },
  },
} satisfies AuthOptions

export const { auth, signIn, signOut, handlers } = Auth(authOptions)
