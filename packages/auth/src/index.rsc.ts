import { cache } from 'react'

import { generateGravatar, OAuthConfig, auth as uncachedAuth } from './config'

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */
const auth = cache(uncachedAuth)

export type { Session } from './config'
export { auth, OAuthConfig, generateGravatar }
export { handlers } from './lib/handlers'
export {
  createSession,
  invalidateSessionToken,
  validateSessionToken,
} from './lib/session'
