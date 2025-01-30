import type { TRPCRouterRecord } from '@trpc/server'
import { z } from 'zod'

import { protectedProcedure, publicProcedure } from '../trpc'

export const userRouter = {
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

  getAddress: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.address.findMany({
      where: { userId: ctx.session.user.id },
    })
  }),
} satisfies TRPCRouterRecord
