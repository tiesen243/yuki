import { createTRPCClient, loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import SuperJSON from 'superjson'

import type { AppRouter } from '@yuki/api'

import { useToken } from '@/hooks/use-token'

export const api = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        import.meta.env.DEV || (op.direction === 'down' && op.result instanceof Error),
    }),
    unstable_httpBatchStreamLink({
      transformer: SuperJSON,
      url: `${import.meta.env.VITE_WEB_URL}/api/trpc`,
      headers() {
        const headers = new Headers()
        headers.set('x-trpc-source', 'vitejs-vue')

        const { token } = useToken()
        headers.set('Authorization', `Bearer ${token}`)

        return headers
      },
    }),
  ],
})
