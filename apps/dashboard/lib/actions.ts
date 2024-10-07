'use server'

import { cookies } from 'next/headers'

import { auth } from '@yuki/auth'
import { lucia } from '@yuki/auth/lucia'

import { getBaseUrl } from '@/lib/utils'

export const signOut = async () => {
  const session = await auth()
  if (!session) return
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    domain: new URL(getBaseUrl()).hostname.replace(/^.*?\.(.*)/, '$1'),
  })
}
