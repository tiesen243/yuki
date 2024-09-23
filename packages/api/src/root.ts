import { authRouter } from './routers/auth'
import { categoryRouter } from './routers/category'
import { orderRouter } from './routers/order'
import { productRouter } from './routers/product'
import { userRouter } from './routers/user'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  order: orderRouter,
  product: productRouter,
  category: categoryRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
