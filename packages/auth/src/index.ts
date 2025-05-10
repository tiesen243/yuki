import { authOptions } from './config'
import { Auth } from './core/auth'

export type * from './types'
export const { auth, signIn, signOut, handlers } = Auth(authOptions)
export {
  hashSHA256,
  validateToken,
  invalidateToken,
  invalidateAllTokens,
} from './core/queries'
export { hash, verify } from './core/password'
