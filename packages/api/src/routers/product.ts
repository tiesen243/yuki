import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { and, asc, desc, eq, ne } from '@yukinu/db'
import { categories, products } from '@yukinu/db/schema'
import { allSchema, byIdSchema } from '@yukinu/validators/product'

import { publicProcedure } from '../trpc'

export const productRouter = {
  all: publicProcedure.input(allSchema).query(async ({ ctx, input }) => {
    const { page, limit, sortBy } = input
    const orderBy = input.orderBy === 'asc' ? asc : desc

    const productList = await ctx.db
      .select(productPreview)
      .from(products)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(orderBy(products[sortBy]))

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
      .select(productDetail)
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
      if (!input.categoryId)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Category ID is required to fetch relative products',
        })

      const relativeProducts = await ctx.db
        .select(productPreview)
        .from(products)
        .where(
          and(
            eq(products.categoryId, input.categoryId),
            ne(products.id, input.id),
          ),
        )
        .limit(8)

      return relativeProducts
    }),
} satisfies TRPCRouterRecord

const productPreview = {
  id: products.id,
  name: products.name,
  description: products.description,
  image: products.image,
  price: products.price,
  discount: products.discount,
  createdAt: products.createdAt,
}

const productDetail = {
  id: products.id,
  name: products.name,
  description: products.description,
  image: products.image,
  stock: products.stock,
  price: products.price,
  discount: products.discount,
  category: categories.name,
}
