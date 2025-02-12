import { createTRPCClient, loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import SuperJSON from 'superjson'

import type { AppRouter } from '@yuki/api'

import { env } from '@/env'

export const api = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        env.NODE_ENV === 'development' ||
        (op.direction === 'down' && op.result instanceof Error),
    }),
    unstable_httpBatchStreamLink({
      transformer: SuperJSON,
      url: `${env.VUE_PUBLIC_WEB_URL}/api/trpc`,
      headers: () => ({
        'x-trpc-source': 'rspack-vue',
      }),
      fetch: (url, options) =>
        fetch(url, {
          ...options,
          credentials: 'include',
        }),
    }),
  ],
})
