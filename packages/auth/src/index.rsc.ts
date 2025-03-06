import { cache } from 'react'

import { handlers, signIn, signOut, auth as uncachedAuth } from './configs'

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */
const auth = cache(uncachedAuth)

export type { SessionResult } from './utils/session'
export { auth, signIn, signOut, handlers }
export { Session } from './utils/session'
export { Password } from './utils/password'
