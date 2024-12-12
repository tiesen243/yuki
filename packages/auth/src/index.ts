'use server'

import { cookies } from 'next/headers'

import type { Session, User } from '@yuki/db'

import { lucia } from './lucia'

type Auth = (Session & { user: User }) | null

const auth = async (): Promise<Auth> => {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) return null

  const result = await lucia.validateSession(sessionId)

  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      ;(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      ;(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch {
    return null
  }

  if (!result.session) return null
  return { ...result.session, user: result.user }
}

const signIn = async (userId: string) => {
  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  ;(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}

const signOut = async () => {
  const session = await auth()
  if (!session) return

  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  ;(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}

const validateToken = async (token: string): Promise<Auth> => {
  const sessionToken = token.slice('Bearer '.length)
  const session = await lucia.validateSession(sessionToken)
  return session.user ? { ...session.session, user: session.user } : null
}

const invalidateSessionToken = async (token: string) => {
  const sessionToken = token.slice('Bearer '.length)
  await lucia.invalidateSession(sessionToken)
}

export { auth, signIn, signOut, validateToken, invalidateSessionToken }
