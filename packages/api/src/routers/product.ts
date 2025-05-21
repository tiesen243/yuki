import type { TRPCRouterRecord } from '@trpc/server'

import { asc, desc } from '@yuki/db'
import { products } from '@yuki/db/schema'
import { allSchema } from '@yuki/validators/product'

import { publicProcedure } from '../trpc'

export const productRouter = {
  all: publicProcedure.input(allSchema).query(async ({ ctx, input }) => {
    const { page, limit, sortBy } = input
    const orderBy = input.orderBy === 'asc' ? asc : desc

    const productList = await ctx.db
      .select()
      .from(products)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(orderBy(products[sortBy]))
      .execute()

    const total = await ctx.db.$count(products)
    const totalPage = Math.ceil(total / limit)

    return {
      products: productList,
      totalPage,
      page,
    }
  }),
} satisfies TRPCRouterRecord
