import 'server-only'

import { cookies } from 'next/headers'
import { cache } from 'react'

import type { Session, User } from '@yuki/db'

import { lucia } from './lucia'

type Auth = null | (Session & { user: User })

const uncachedAuth = async (): Promise<Auth> => {
  const cookie = await cookies()
  const sessionId = cookie.get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) return null

  const result = await lucia.validateSession(sessionId)

  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch {
    return null
  }

  if (!result.session) return null
  return { ...result.session, user: result.user }
}

export const auth = cache(uncachedAuth)
