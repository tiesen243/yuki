import { createTRPCRouter, publicProcedure } from '../trpc'
import { userSchema as schema } from '../validators/user'

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.input(schema.query).query(async ({ ctx, input }) => {
    const users = await ctx.db.user.findMany({
      where: {
        ...(input.q && {
          OR: [
            { name: { contains: input.q, mode: 'insensitive' } },
            { email: { contains: input.q, mode: 'insensitive' } },
          ],
        }),
      },
      take: input.limit,
      skip: input.limit * (input.page - 1),
      orderBy: { createdAt: 'desc' },
    })

    const totalPage = Math.ceil((await ctx.db.user.count()) / input.limit)

    return {
      users,
      totalPage,
    }
  }),

  getOne: publicProcedure.input(schema.getOne).query(async ({ ctx, input: { id } }) => {
    const user = await ctx.db.user.findUnique({ where: { id } })
    if (!user) throw new Error('User not found')

    const products = await ctx.db.product.findMany({
      where: { userId: id },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    })

    return { user, products }
  }),
})
