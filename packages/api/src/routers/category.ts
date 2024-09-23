import { TRPCError } from '@trpc/server'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { categorySchema as schema } from '../validators/category'

export const categoryRouter = createTRPCRouter({
  // [GET] /api/trpc/category.getAll
  getAll: publicProcedure.input(schema.query).query(async ({ input, ctx }) => {
    const categories = await ctx.db.category.findMany({
      ...(input.q && { where: { name: { contains: input.q, mode: 'insensitive' } } }),
      take: input.limit,
      skip: input.limit * (input.page - 1),
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { products: true } } },
    })

    if (categories.length === 0) return { categories: [], totalPage: 0 }

    const totalPage = Math.ceil((await ctx.db.category.count()) / input.limit)

    return {
      categories,
      totalPage,
    }
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
      category,
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

  // [POST] /api/trpc/category.update
  update: protectedProcedure.input(schema.update).mutation(async ({ input, ctx }) => {
    const category = await ctx.db.category.update({
      where: { id: input.id },
      data: {
        name: input.name,
        description: input.description,
        ...(input.image && { image: input.image }),
      },
    })

    if (category.image && category.image !== input.image)
      await ctx.utapi.deleteFiles([category.image.split('/').pop() ?? ''])

    return category
  }),

  // [POST] /api/trpc/category.delete
  delete: protectedProcedure.input(schema.getOne).mutation(async ({ input: { id }, ctx }) => {
    const category = await ctx.db.category.findUnique({ where: { id } })
    if (!category) throw new TRPCError({ code: 'NOT_FOUND', message: 'Category not found' })

    await ctx.db.category.delete({ where: { id } })
    if (category.image.startsWith('https'))
      await ctx.utapi.deleteFiles([category.image.split('/').pop() ?? ''])

    return category
  }),
})
