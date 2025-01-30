import type { TRPCRouterRecord } from '@trpc/server'

import { publicProcedure } from '../trpc'
import { query } from '../validators/product'

export const productRouter = {
  getAll: publicProcedure.input(query).query(async ({ ctx, input }) => {
    return ctx.db.product.findMany({
      where: {
        name: { contains: input.query, mode: 'insensitive' },
      },
      take: input.limit,
      skip: (input.page - 1) * input.limit,
      orderBy: { createdAt: 'desc' },
    })
  }),
} satisfies TRPCRouterRecord
