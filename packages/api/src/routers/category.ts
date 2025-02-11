import type { TRPCRouterRecord } from '@trpc/server'

import { publicProcedure, restrictedProcedure } from '../trpc'
import * as schemas from '../validators/category'

export const categoryRouter = {
  // [GET] /api/trpc/category.getAll
  getAll: publicProcedure.input(schemas.query).query(async ({ ctx, input }) => {
    const categories = await ctx.db.category.findMany({
      take: input.limit,
      skip: (input.page - 1) * input.limit,
      orderBy: { products: { _count: 'desc' } },
      include: { _count: { select: { products: true } } },
    })

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      image: category.image,
      numberOfProducts: category._count.products,
    }))
  }),

  // [GET] /api/trpc/category.getOne
  getOne: publicProcedure.input(schemas.getOneSchema).query(async ({ ctx, input }) => {
    return ctx.db.category.findFirst({
      where: { id: input.id },
      include: { products: { orderBy: { createdAt: 'desc' } } },
    })
  }),

  // [POST] /api/trpc/category.create
  create: restrictedProcedure
    .input(schemas.createSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({ data: input })
    }),

  // [POST] /api/trpc/category.update
  update: restrictedProcedure
    .input(schemas.updateSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      return ctx.db.category.update({ where: { id }, data })
    }),

  // [POST] /api/trpc/category.delete
  delete: restrictedProcedure
    .input(schemas.getOneSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.delete({ where: { id: input.id } })
    }),
} satisfies TRPCRouterRecord
