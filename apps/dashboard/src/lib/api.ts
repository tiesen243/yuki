import { createTRPCClient, loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { useCookies } from '@vueuse/integrations/useCookies'
import SuperJSON from 'superjson'

import type { AppRouter } from '@yuki/api'

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

        const cookies = useCookies(['auth_token'])
        const token: string | undefined = cookies.get('auth_token')

        headers.set('Authorization', `Bearer ${token}`)

        return headers
      },
    }),
  ],
})
