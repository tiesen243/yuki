import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const uploaderEnv = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).optional(),
    UPLOADTHING_TOKEN: z.string(),
  },
  client: {},
  experimental__runtimeEnv: {},
  skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
})
