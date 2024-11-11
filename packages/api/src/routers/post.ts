import { createTRPCRouter, publicProcedure } from '@yuki/api/trpc'

export const postRouter = createTRPCRouter({
  hello: publicProcedure.query(async () => {
    return 'Hello World'
  }),
})
