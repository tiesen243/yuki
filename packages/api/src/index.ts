import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { authRouter } from './routers/auth'
import { cartRouter } from './routers/cart'
import { categoryRouter } from './routers/category'
import { dashboardRouter } from './routers/dashboard'
import { orderRouter } from './routers/order'
import { productRouter } from './routers/product'
import { userRouter } from './routers/user'
import { createCallerFactory, createTRPCContext, createTRPCRouter } from './trpc'

const appRouter = createTRPCRouter({
  auth: authRouter,
  cart: cartRouter,
  category: categoryRouter,
  dashboard: dashboardRouter,
  order: orderRouter,
  product: productRouter,
  user: userRouter,
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
