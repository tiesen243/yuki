import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { protectedProcedure, publicProcedure } from '../trpc'
import { createSchema, getOneSchema, query, updateSchema } from '../validators/product'

export const productRouter = {
  /** Get product section */
  getAll: publicProcedure.input(query).query(async ({ ctx, input }) => {
    return ctx.db.product.findMany({
      where: { name: { contains: input.query, mode: 'insensitive' } },
      take: input.limit,
      skip: (input.page - 1) * input.limit,
      orderBy: { createdAt: 'desc' },
      include: { category: { select: { id: true, name: true } } },
    })
  }),
  getOne: publicProcedure.input(getOneSchema).query(async ({ ctx, input }) => {
    return ctx.db.product.findFirst({
      where: { id: input.id },
    })
  }),

  /** Create product section */
  create: protectedProcedure.input(createSchema).mutation(async ({ ctx, input }) => {
    checkAdmin(ctx.session.user.role)
    return ctx.db.product.create({
      data: {
        ...input,
        userId: ctx.session.user.id,
      },
    })
  }),

  /** Update product section */
  update: protectedProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      checkAdmin(ctx.session.user.role)
      return ctx.db.product.update({ where: { id }, data })
    }),

  /** Delete product section */
  delete: protectedProcedure.input(getOneSchema).mutation(async ({ ctx, input }) => {
    checkAdmin(ctx.session.user.role)
    return ctx.db.product.delete({ where: { id: input.id } })
  }),
} satisfies TRPCRouterRecord

const checkAdmin = (role: 'USER' | 'ADMIN') => {
  if (role !== 'ADMIN')
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not authorized to access this resource',
    })
}
