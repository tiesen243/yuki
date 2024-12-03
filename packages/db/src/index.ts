import { neonConfig, Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

import { dbEnv } from '@yuki/db/env'

neonConfig.poolQueryViaFetch = true
neonConfig.webSocketConstructor = ws
const pool = new Pool({ connectionString: dbEnv.DATABASE_URL })
const adapter = new PrismaNeon(pool)

const createPrismaClient = () =>
  new PrismaClient({
    adapter,
    log: dbEnv.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

export type * from '@prisma/client'

if (dbEnv.NODE_ENV !== 'production') globalForPrisma.prisma = db
