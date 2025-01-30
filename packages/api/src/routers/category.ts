import type { TRPCRouterRecord } from '@trpc/server'

import { publicProcedure } from '../trpc'
import { query } from '../validators/category'

export const categoryRouter = {
  getAll: publicProcedure.input(query).query(async ({ ctx, input }) => {
    return ctx.db.category.findMany({
      take: input.limit,
      skip: (input.page - 1) * input.limit,
      select: { id: true, name: true, image: true },
      orderBy: { products: { _count: 'desc' } },
    })
  }),
} satisfies TRPCRouterRecord
