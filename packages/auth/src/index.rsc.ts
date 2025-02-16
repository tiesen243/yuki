import { cache } from 'react'

import { generateGravatar, OAuthConfig, auth as uncachedAuth } from './config'

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */
const auth = cache(uncachedAuth)

export { OAuth2RequestError, generateCodeVerifier, generateState } from 'arctic'

export type { Session } from './config'
export { auth, OAuthConfig, generateGravatar }
export { hashPassword, verifyHashedPassword } from './lib/password'
export {
  createSession,
  invalidateSessionToken,
  validateSessionToken,
} from './lib/session'
