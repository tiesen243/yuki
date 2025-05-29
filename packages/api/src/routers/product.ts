import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { asc, desc, eq } from '@yuki/db'
import { categories, products } from '@yuki/db/schema'
import { allSchema, byIdSchema } from '@yuki/validators/product'

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

  byId: publicProcedure.input(byIdSchema).query(async ({ ctx, input }) => {
    const [product] = await ctx.db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        image: products.image,
        stock: products.stock,
        price: products.price,
        category: categories.name,
      })
      .from(products)
      .where(eq(products.id, input.id))
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .limit(1)

    if (!product)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

    return product
  }),

  relativeProducts: publicProcedure
    .input(byIdSchema)
    .query(async ({ ctx, input }) => {
      const [product] = await ctx.db
        .select()
        .from(products)
        .where(eq(products.id, input.id))
        .limit(1)

      if (!product) return []

      const relativeProducts = await ctx.db
        .select()
        .from(products)
        .where(eq(products.categoryId, product.categoryId))
        .limit(8)

      return relativeProducts.filter((p) => p.id !== product.id)
    }),
} satisfies TRPCRouterRecord
