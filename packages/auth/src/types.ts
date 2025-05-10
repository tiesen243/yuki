import type { users } from '@yuki/db/schema'

import type { authOptions } from './config'
import type { BaseProvider } from './providers/base'

export type Providers = Record<string, BaseProvider>
export type AuthOptions<T extends Providers = Providers> = T

export interface SessionResult {
  user?: typeof users.$inferSelect
  expires: Date
}

export type Options = typeof authOptions
