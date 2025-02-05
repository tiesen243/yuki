import { createTRPCClient, loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import SuperJSON from 'superjson'

import type { AppRouter } from '@yuki/api'

import { env } from '@/env'
import { getBaseUrl } from '@/lib/utils'

export const api = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        env.NODE_ENV === 'development' ||
        (op.direction === 'down' && op.result instanceof Error),
    }),
    unstable_httpBatchStreamLink({
      transformer: SuperJSON,
      url: `${getBaseUrl()}/api/trpc`,
      headers() {
        const headers = new Headers()
        headers.set('x-trpc-source', 'nuxtjs-vue')

        return headers
      },
    }),
  ],
})
