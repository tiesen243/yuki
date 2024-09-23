import { createTRPCRouter, protectedProcedure } from '../trpc'
import { orderSchema as schema } from '../validators/order'

export const orderRouter = createTRPCRouter({
  getAll: protectedProcedure.input(schema.query).query(async ({ ctx, input }) => {
    const orders = await ctx.db.order.findMany({
      ...(input.q && { where: { user: { email: { contains: input.q } } } }),
      take: input.limit,
      skip: input.limit * (input.page - 1),
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    })

    if (orders.length === 0) return { orders: [], totalPage: 0 }

    const totalPage = Math.ceil((await ctx.db.order.count()) / input.limit)

    return {
      orders: orders.map((order) => ({
        id: order.id,
        user: order.user.name,
        numOfItems: order.items.length,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
      })),
      totalPage,
    }
  }),
})
