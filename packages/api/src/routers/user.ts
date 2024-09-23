import { createTRPCRouter, publicProcedure } from '../trpc'
import { userSchema as schema } from '../validators/user'

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.input(schema.query).query(async ({ ctx, input }) => {
    const products = await ctx.db.user.findMany({
      where: {
        ...(input.q && {
          OR: [{ name: { contains: input.q } }, { email: { contains: input.q } }],
        }),
      },
      take: input.limit,
      skip: input.limit * (input.page - 1),
      orderBy: { createdAt: 'desc' },
    })
    return products
  }),
})
