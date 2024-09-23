import { TRPCError } from '@trpc/server'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { categorySchema as schema } from '../validators/category'

export const categoryRouter = createTRPCRouter({
  // [GET] /api/trpc/category.getAll
  getAll: publicProcedure.input(schema.query).query(async ({ input, ctx }) => {
    const categories = await ctx.db.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { createdAt: 'desc' },
      ...(input.q && { where: { name: { contains: input.q } } }),
      ...(!input.noLimit && {
        take: input.limit,
        skip: input.limit * (input.page - 1),
      }),
    })
    return categories
  }),

  // [GET] /api/trpc/category.getOne
  getOne: publicProcedure.input(schema.getOne).query(async ({ input: { id }, ctx }) => {
    const category = await ctx.db.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    })
    if (!category) throw new TRPCError({ code: 'NOT_FOUND', message: 'Category not found' })

    const products = await ctx.db.product.findMany({
      where: { categoryId: id },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    })

    return {
      id: category.id,
      name: category.name,
      image: category.image,
      description: category.description,
      productCount: category._count.products,
      products,
    }
  }),

  // [POST] /api/trpc/category.create
  create: protectedProcedure.input(schema.create).mutation(async ({ input, ctx }) => {
    const category = await ctx.db.category.create({
      data: {
        name: input.name,
        description: input.description,
        ...(input.image && { image: input.image }),
      },
    })
    return category
  }),
})
