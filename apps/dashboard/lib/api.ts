import { createTRPCClient, loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import SuperJSON from 'superjson'

import type { AppRouter } from '@yuki/api'

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') return 'https://localhost:3000'
  return 'https://shop.tiesen.id.vn'
}

export const api = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        // @ts-expect-error - That ril
        // eslint-disable-next-line no-constant-binary-expression, @typescript-eslint/no-unnecessary-condition, @stylistic/operator-linebreak
        process.env.NODE_ENV === 'development' ??
        (op.direction === 'down' && op.result instanceof Error),
    }),
    unstable_httpBatchStreamLink({
      transformer: SuperJSON,
      url: getBaseUrl() + '/api/trpc',
      headers() {
        const headers = new Headers()
        headers.set('x-trpc-source', 'nextjs-react')
        return headers
      },
    }),
  ],
})
