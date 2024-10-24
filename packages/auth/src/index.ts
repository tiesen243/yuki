import { cookies } from 'next/headers'
import { cache } from 'react'

import type { Session, User } from '@yuki/db'
import { authEnv } from '@yuki/auth/env'

import { lucia } from './lucia'

type Auth = null | (Session & { user: User })

const uncachedAuth = async (): Promise<Auth> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) return null

  const result = await lucia.validateSession(sessionId)

  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        domain: authEnv.VERCEL_PROJECT_PRODUCTION_URL?.replace('dashboard.', '') ?? 'localhost',
      })
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        domain: authEnv.VERCEL_PROJECT_PRODUCTION_URL?.replace('dashboard.', '') ?? 'localhost',
      })
    }
  } catch {
    return null
  }

  if (!result.session) return null
  return { ...result.session, user: result.user }
}

export const auth = cache(uncachedAuth)
