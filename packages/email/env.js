import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const emailEnv = createEnv({
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(['development', 'production']).optional(),
    RESEND_KEY: z.string(),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {},
  skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
})
