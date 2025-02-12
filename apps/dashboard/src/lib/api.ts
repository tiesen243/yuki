import { createTRPCClient, loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
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
    unstable_httpBatchStreamLink({
      transformer: SuperJSON,
      url: `${env.VUE_PUBLIC_WEB_URL}/api/trpc`,
      headers: () => {
        const token: string | undefined = useCookies(['auth_token']).get('auth_token')

        return {
          Authorization: `Bearer ${token}`,
          'x-trpc-source': 'rspack-vue',
        }
      },
    }),
  ],
})
