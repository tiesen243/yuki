import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { authRouter } from './routers/auth'
import { postRouter } from './routers/post'
import {
  createCallerFactory,
  createTRPCContext,
  createTRPCRouter,
} from './trpc'

const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
})

/**
 * Export type definition of API
 */
type AppRouter = typeof appRouter

/**
 * Handle incoming API requests
 */
const handlers = async (req: Request) => {
  let response: Response

  if (req.method === 'OPTIONS') response = new Response(null, { status: 204 })
  else
    response = await fetchRequestHandler({
      endpoint: '/api/trpc',
      router: appRouter,
      req,
      createContext: () => createTRPCContext({ headers: req.headers }),
      onError({ error, path }) {
        console.error(`>>> tRPC Error on '${path}'`, error)
      },
    })

  /**
   * Configure basic CORS headers
   * You should extend this to match your needs
   */
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Request-Method', '*')
  response.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
  response.headers.set('Access-Control-Allow-Headers', '*')
  return response
}

/**
 * Create a server-side caller for the tRPC API
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
const createCaller = createCallerFactory(appRouter)

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = RouterInputs['post']['byId']
 *      ^? { id: number }
 **/
type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 **/
type RouterOutputs = inferRouterOutputs<AppRouter>

export type { AppRouter, RouterInputs, RouterOutputs }
export { appRouter, createCaller, createTRPCContext, handlers }
