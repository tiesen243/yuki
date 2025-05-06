'use server'

import type { AuthOptions } from './core/auth'
import { Auth } from './core/auth'
import { FacebookProvider } from './providers/facebook'
import { GoogleProvider } from './providers/google'

/**
 * Authentication configuration
 *
 * @remarks
 * Each provider requires CLIENT_ID and CLIENT_SECRET environment variables
 * (e.g., DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET)
 *
 * Callback URL should be set to: {{ BASE_URL }}/api/auth/:provider/callback
 * (e.g., https://yourdomain.com/api/auth/discord/callback)
 */
const authOptions = {
  cookieKey: 'auth_token',
  providers: {
    facebook: new FacebookProvider(),
    google: new GoogleProvider(),
  },
} satisfies AuthOptions

// Create singleton instance
const authInstance = new Auth(authOptions)

// Export authentication methods
export const auth = authInstance.auth.bind(authInstance)
export const signOut = authInstance.signOut.bind(authInstance)
export const handlers = authInstance.handlers.bind(authInstance)
export const middleware = authInstance.middleware.bind(authInstance)
