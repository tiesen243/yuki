import { createEnv } from '@t3-oss/env-nuxt'
import { vercel } from '@t3-oss/env-nuxt/presets-zod'
import { z } from 'zod'

import { env as authEnv } from '@yuki/auth/env'

export const env = createEnv({
  extends: [vercel(), authEnv],
  shared: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string(),
    WEB_URL: z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NUXT_PUBLIC_CLIENTVAR: z.string(),
  },
  skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
})
