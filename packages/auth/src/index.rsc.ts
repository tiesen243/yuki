import { cache } from 'react'

import {
  auth as defaultAuth,
  invalidateSessionToken,
  signIn,
  signOut,
  validateToken,
} from './index'

const auth = cache(defaultAuth)

export { auth, signIn, signOut, validateToken, invalidateSessionToken }
