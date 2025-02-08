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
import * as schemas from '../validators/auth'

export const authRouter = {
  // [GET] /api/trpc/auth.getSession
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),

  // [POST] /api/trpc/auth.signUp
  signUp: publicProcedure.input(schemas.signUpSchema).mutation(async ({ ctx, input }) => {
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

  // [POST] /api/trpc/auth.signIn
  signIn: publicProcedure.input(schemas.signInSchema).mutation(async ({ ctx, input }) => {
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

  // [POST] /api/trpc/auth.signOut
  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    await invalidateSessionToken(ctx.token ?? '')
    return { success: true }
  }),

  // [POST] /api/trpc/auth.changePassword
  changePassword: protectedProcedure
    .input(schemas.changePasswordSchema)
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
