import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { protectedProcedure, publicProcedure } from '../trpc'
import * as schemas from '../validators/category'

export const categoryRouter = {
  /** Get category section */
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
  getOne: publicProcedure.input(schemas.getOneSchema).query(async ({ ctx, input }) => {
    return ctx.db.category.findFirst({
      where: { id: input.id },
      include: { products: { orderBy: { createdAt: 'desc' } } },
    })
  }),

  /** Create category section */
  create: protectedProcedure
    .input(schemas.createSchema)
    .mutation(async ({ ctx, input }) => {
      checkAdmin(ctx.session.user.role)
      return ctx.db.category.create({ data: input })
    }),

  /** Update category section */
  update: protectedProcedure
    .input(schemas.updateSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      checkAdmin(ctx.session.user.role)
      return ctx.db.category.update({ where: { id }, data })
    }),

  /** Delete category section */
  delete: protectedProcedure
    .input(schemas.getOneSchema)
    .mutation(async ({ ctx, input }) => {
      checkAdmin(ctx.session.user.role)
      return ctx.db.category.delete({ where: { id: input.id } })
    }),
} satisfies TRPCRouterRecord

const checkAdmin = (role: 'USER' | 'ADMIN') => {
  if (role !== 'ADMIN')
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not authorized to access this resource',
    })
}
