import { cache } from 'react'

import { handlers, middleware, signOut, auth as uncachedAuth } from './config'

/**
 * React-cached authentication function
 *
 * @description
 * This memoized version of auth() ensures that multiple calls within the same
 * React Server Component request will only perform the authentication check once,
 * improving performance in components that need session data.
 */
const auth = cache(uncachedAuth)

export type { SessionResult } from './core/session'
export { auth, handlers, signOut, middleware }
export { Session } from './core/session'
export { Password } from './core/password'
