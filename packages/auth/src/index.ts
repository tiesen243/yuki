'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'

import { lucia } from '@yuki/auth/lucia'
import { uncachedAuth } from '@yuki/auth/uncached'

export const auth = cache(uncachedAuth)

export const signOut = async () => {
  const session = await auth()
  if (!session) return

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}
