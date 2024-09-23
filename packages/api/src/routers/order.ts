import { createTRPCRouter, protectedProcedure } from '../trpc'
import { orderSchema as schema } from '../validators/order'

export const orderRouter = createTRPCRouter({
  getAll: protectedProcedure.input(schema.query).query(async ({ ctx, input }) => {
    const orders = await ctx.db.order.findMany({
      ...(input.q && {
        where: {
          OR: [
            { id: { contains: input.q } },
            { user: { id: { contains: input.q } } },
            { user: { email: { contains: input.q } } },
          ],
        },
      }),
      ...(!input.noLimit && {
        take: input.limit,
        skip: input.limit * (input.page - 1),
      }),
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    })

    return orders.map((order) => ({
      id: order.id,
      user: order.user.name,
      numOfItems: order.items.length,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
    }))
  }),
})
