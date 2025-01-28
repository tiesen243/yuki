import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client'
import { useCookies } from '@vueuse/integrations/useCookies'
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
    httpBatchLink({
      transformer: SuperJSON,
      url: env.VITE_WEB_URL + '/api/trpc',
      headers() {
        const headers = new Headers()
        headers.set('x-trpc-source', 'vue')

        const cookies = useCookies(['auth_token'])
        headers.set('authorization', `Bearer ${cookies.get('auth_token')}`)

        return headers
      },
    }),
  ],
})
