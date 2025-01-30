import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { protectedProcedure, publicProcedure } from '../trpc'
import { getOneSchema, newAddressSchema, updateAddressSchema } from '../validators/user'

export const userRouter = {
  /** Get user session */
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== 'ADMIN')
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not authorized to access this resource',
      })
    return ctx.db.user.findMany({ orderBy: { createdAt: 'desc' } })
  }),

  /** Link account section */
  getLinkedAccounts: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user) return []
    return ctx.db.account.findMany({
      where: { userId: ctx.session.user.id },
    })
  }),
  unlinkAccount: protectedProcedure
    .input(z.object({ provider: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const account = await ctx.db.account.findFirst({
        where: { userId: ctx.session.user.id, provider: input.provider },
      })
      if (!account) return false
      await ctx.db.account.delete({
        where: {
          provider_providerId: {
            provider: account.provider,
            providerId: account.providerId,
          },
        },
      })
      return true
    }),

  /** Address section */
  getAddress: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.address.findMany({
      where: { userId: ctx.session.user.id },
    })
  }),
  getOneAddress: protectedProcedure.input(getOneSchema).query(async ({ ctx, input }) => {
    return ctx.db.address.findFirst({
      where: { id: input.id, userId: ctx.session.user.id },
    })
  }),
  newAddress: protectedProcedure
    .input(newAddressSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.address.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      })
    }),
  updateAddress: protectedProcedure
    .input(updateAddressSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      return ctx.db.address.update({
        where: { id, userId: ctx.session.user.id },
        data,
      })
    }),
  deleteAddress: protectedProcedure
    .input(getOneSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.address.delete({
        where: { id: input.id, userId: ctx.session.user.id },
      })
    }),
} satisfies TRPCRouterRecord
