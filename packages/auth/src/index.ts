'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { authEnv } from '@yuki/auth/env'
import { lucia } from '@yuki/auth/lucia'
import { uncachedAuth } from '@yuki/auth/uncached'

export const auth = cache(uncachedAuth)

const domain = authEnv.VERCEL_PROJECT_PRODUCTION_URL
  ? authEnv.VERCEL_PROJECT_PRODUCTION_URL.replace('dashboard.', '')
  : 'localhost'

export const signIn = async (userId: string) => {
  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, { ...sessionCookie.attributes, domain })
}

export const signOut = async () => {
  const session = await auth()
  if (!session) return

  console.log('session', session)

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, { ...sessionCookie.attributes, domain })
  redirect('/sign-in')
}
