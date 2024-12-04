import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { userRouter } from './routers/user'
import { createCallerFactory, createTRPCContext, createTRPCRouter } from './trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
const appRouter = createTRPCRouter({
  user: userRouter,
})

// export type definition of API
type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
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

export { appRouter, createCaller, createTRPCContext }
export type { AppRouter, RouterInputs, RouterOutputs }
