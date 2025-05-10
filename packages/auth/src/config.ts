import type { AuthOptions } from './types'
import { FacebookProvider } from './providers/facebook'
import { GoogleProvider } from './providers/google'

/**
 * Configuration constants for session management
 */
export const TOKEN_BYTES = 20 // Number of random bytes for token generation
export const SESSION_EXPIRATION = 1000 * 60 * 60 * 24 * 30 // 30 days in milliseconds
export const SESSION_REFRESH_THRESHOLD = SESSION_EXPIRATION / 2 // 15 days in milliseconds
export const SESSION_COOKIE_NAME = 'auth_token' // Name of the session cookie

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
export const authOptions = {
  facebook: new FacebookProvider(),
  google: new GoogleProvider(),
} satisfies AuthOptions
