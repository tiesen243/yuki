import type { User } from '@prisma/client'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { Lucia } from 'lucia'

import { authEnv } from '@yuki/auth/env'
import { db } from '@yuki/db'

const adapter = new PrismaAdapter(db.session, db.user)

const getDomain = () => {
  if (authEnv.VERCEL_PROJECT_PRODUCTION_URL)
    return authEnv.VERCEL_PROJECT_PRODUCTION_URL.replace('dashboard.', '')
  return 'localhost'
}

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: { secure: authEnv.NODE_ENV === 'production', domain: getDomain() },
  },
  getUserAttributes: (user) => user,
})

export * from 'lucia'
export * from 'arctic'

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: User
  }
}
