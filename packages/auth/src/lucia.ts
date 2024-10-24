import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { Lucia } from 'lucia'

import type { User } from '@yuki/db'
import { db } from '@yuki/db'

import { authEnv } from '../env'

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: { expires: false, attributes: { secure: authEnv.NODE_ENV === 'production' } },
  getUserAttributes: (attributes) => attributes,
})

export { Scrypt } from 'lucia'

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: User
  }
}
