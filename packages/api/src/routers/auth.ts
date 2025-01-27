import type { TRPCRouterRecord } from '@trpc/server'

import { invalidateSessionToken } from '@yuki/auth'

import { protectedProcedure, publicProcedure } from '../trpc'

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.token) return { success: false }
    await invalidateSessionToken(ctx.token)
    return { success: true }
  }),
} satisfies TRPCRouterRecord
