export { OAuth2RequestError } from 'arctic'

export type { Session } from './config'
export { auth, generateGravatar } from './config'
export { GET, POST, OPTIONS } from './lib/handler'
export { hashPassword, verifyHashedPassword } from './lib/password'
export {
  createSession,
  invalidateSessionToken,
  validateSessionToken,
} from './lib/session'
