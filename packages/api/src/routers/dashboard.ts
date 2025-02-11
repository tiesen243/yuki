import type { TRPCRouterRecord } from '@trpc/server'

import { restrictedProcedure } from '../trpc'

export const dashboardRouter = {
  getMetrics: restrictedProcedure.query(async ({ ctx }) => {
    const [totalRevenue, totalOrders, totalCustomers, totalDeliveredOrders] =
      await Promise.all([
        ctx.db.cart.aggregate({
          where: { status: 'DELIVERED' },
          _sum: { total: true },
        }),
        ctx.db.cart.count({ where: { status: { not: 'NEW' } } }),
        ctx.db.user.count(),
        ctx.db.cart.count({ where: { status: 'DELIVERED' } }),
      ])

    const conversionRate = (totalDeliveredOrders / totalCustomers) * 100

    return [
      {
        name: 'Total Revenue',
        value: `$${totalRevenue._sum.total ?? 0}`,
      },
      {
        name: 'Orders',
        value: totalOrders,
      },
      {
        name: 'Customers',
        value: totalCustomers,
      },
      {
        name: 'Conversion Rate',
        value: conversionRate,
      },
    ]
  }),
} satisfies TRPCRouterRecord
