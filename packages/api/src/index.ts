import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { authRouter } from './routers/auth'
import { postRouter } from './routers/post'
import { createCallerFactory, createTRPCContext, createTRPCRouter } from './trpc'

const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
})

// export type definition of API
type AppRouter = typeof appRouter

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
export { appRouter, createCaller, createTRPCContext }
