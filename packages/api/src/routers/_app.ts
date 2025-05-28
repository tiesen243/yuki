import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { createTRPCRouter } from '../trpc'
import { addressRouter } from './address'
import { authRouter } from './auth'
import { cartRouter } from './cart'
import { productRouter } from './product'

const appRouter = createTRPCRouter({
  address: addressRouter,
  auth: authRouter,
  cart: cartRouter,
  product: productRouter,
})

/**
 * Export type definition of API
 */
type AppRouter = typeof appRouter

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
export { appRouter }
