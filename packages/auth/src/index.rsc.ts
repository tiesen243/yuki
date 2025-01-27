import { cache } from 'react'

import { signIn, signOut, auth as uncachedAuth } from './config'

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */
const auth = cache(uncachedAuth)

export { OAuth2RequestError } from 'arctic'

export type { Session } from './config'
export { handlers } from './lib/handlers'
export { auth, signIn, signOut }
export { invalidateSessionToken, validateSessionToken } from './lib/session'
