import { createEnv } from '@t3-oss/env-nextjs'
import { uploadthing, vercel } from '@t3-oss/env-nextjs/presets-zod'
import { z } from 'zod'

import { env as authEnv } from '@yuki/auth/env'

export const env = createEnv({
  extends: [vercel(), uploadthing(), authEnv],
  shared: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_DASHBOARD_URL: z.string().optional(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_DASHBOARD_URL: process.env.NEXT_PUBLIC_DASHBOARD_URL,

    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
})
