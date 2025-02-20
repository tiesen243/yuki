import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter, createTRPCContext } from '@yuki/api'

import type { Route } from './+types/api.trpc.$trpc'

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
const setCorsHeaders = (res: Response) => {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Request-Method', '*')
  res.headers.set('Access-Control-Allow-Methods', 'OPTIONS,GET,POST')
  res.headers.set(
    'Access-Control-Allow-Headers',
    'authorization,accept,content-type,trpc-accept,x-trpc-source',
  )
}

export const OPTIONS = () => {
  const response = new Response(null, { status: 204 })
  setCorsHeaders(response)
  return response
}

const handler = async ({ request }: Route.LoaderArgs | Route.ActionArgs) => {
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req: request,
    createContext: () => createTRPCContext({ headers: request.headers }),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error)
    },
  })

  setCorsHeaders(response)
  return response
}

export { handler as loader, handler as action }
