'use server'

import type { Session, User } from '@prisma/client'
import { cache } from 'react'
import { cookies } from 'next/headers'

import { lucia } from '@yuki/auth/lucia'

type Auth = null | (Session & { user: User })

const uncachedAuth = async (): Promise<Auth> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) return null

  const result = await lucia.validateSession(sessionId)

  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch {
    return null
  }

  if (!result.session) return null
  return { ...result.session, user: result.user }
}

export const auth = cache(uncachedAuth)

export const signOut = async () => {
  const session = await auth()
  if (!session) return

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}
