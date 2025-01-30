import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import {
  createSession,
  generateGravatar,
  hashPassword,
  invalidateSessionToken,
  verifyHashedPassword,
} from '@yuki/auth'

import { protectedProcedure, publicProcedure } from '../trpc'
import { changePassword, signIn, signUp } from '../validators/auth'

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  signUp: publicProcedure.input(signUp).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({ where: { email: input.email } })
    if (user) throw new TRPCError({ code: 'CONFLICT', message: 'User already exists' })

    const password = await hashPassword(input.password)
    return await ctx.db.user.create({
      data: {
        name: input.name,
        email: input.email,
        image: `https://www.gravatar.com/avatar/${generateGravatar(input.email)}?s=256`,
        password,
      },
    })
  }),
  signIn: publicProcedure.input(signIn).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({ where: { email: input.email } })
    if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

    if (!user.password)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You have not set a password',
      })

    const isValid = await verifyHashedPassword(user.password, input.password)
    if (!isValid)
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid password' })

    return await createSession(user.id)
  }),
  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.token) return { success: false }
    await invalidateSessionToken(ctx.token)
    return { success: true }
  }),
  changePassword: protectedProcedure
    .input(changePassword)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({ where: { id: ctx.session.user.id } })
      if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

      if (user.password && input.currentPassword) {
        const isValid = await verifyHashedPassword(user.password, input.currentPassword)
        if (!isValid)
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid password' })
      }

      await ctx.db.session.deleteMany()

      const password = await hashPassword(input.newPassword)
      return await ctx.db.user.update({
        where: { id: user.id },
        data: { password },
      })
    }),
} satisfies TRPCRouterRecord
