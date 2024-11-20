'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

import type { Session, User } from '@yuki/db'
import { authEnv } from '@yuki/auth/env'
import { lucia } from '@yuki/auth/lucia'

const auth = cache(async (): Promise<null | (Session & { user: User })> => {
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
})

const domain = authEnv.VERCEL_PROJECT_PRODUCTION_URL
  ? authEnv.VERCEL_PROJECT_PRODUCTION_URL.replace('dashboard.', '')
  : 'localhost'

const signIn = async (userId: string) => {
  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, { ...sessionCookie.attributes, domain })
}

const signOut = async () => {
  const session = await auth()
  if (!session) return

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, { ...sessionCookie.attributes, domain })
  redirect('/sign-in')
}

export { auth, signIn, signOut }
