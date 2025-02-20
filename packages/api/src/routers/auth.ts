import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import {
  createSession,
  generateGravatar,
  hashPassword,
  verifyHashedPassword,
} from '@yuki/auth'
import { sendEmail } from '@yuki/email'
import { env } from '@yuki/email/env'

import { protectedProcedure, publicProcedure } from '../trpc'
import * as schemas from '../validators/auth'

export const authRouter = {
  // [POST] /api/trpc/auth.signUp
  signUp: publicProcedure
    .input(schemas.signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      })
      if (user)
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        })

      const password = await hashPassword(input.password)
      await sendEmail({ type: 'Welcome', data: input })
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
  signIn: publicProcedure
    .input(schemas.signInSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      })
      if (!user)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

      if (!user.password)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You have not set a password',
        })

      const isValid = await verifyHashedPassword(user.password, input.password)
      if (!isValid)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid password',
        })

      return await createSession(user.id)
    }),

  // [POST] /api/trpc/auth.changePassword
  changePassword: protectedProcedure
    .input(schemas.changePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      })
      if (!user)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

      if (user.password && input.currentPassword) {
        const isValid = await verifyHashedPassword(
          user.password,
          input.currentPassword,
        )
        if (!isValid)
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid password',
          })
      }

      await ctx.db.session.deleteMany()

      const password = await hashPassword(input.newPassword)
      await ctx.db.user.update({
        where: { id: user.id },
        data: { password },
      })

      await sendEmail({ type: 'ChangePassword', data: user })

      return { success: true }
    }),

  // [POST] /api/trpc/auth.forgotPassword
  forgotPassword: publicProcedure
    .input(schemas.forgotPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({ where: input })
      if (!user)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

      const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
      const code = await ctx.db.verifier.create({
        data: { userId: user.id, expiresAt },
      })

      await sendEmail({
        type: 'ForgotPassword',
        data: {
          ...user,
          resetUrl: `${env.VERCEL_PROJECT_PRODUCTION_URL ?? 'http://localhost:3000'}/forgot-password/reset?token=${code.token}`,
        },
      })

      return { success: true }
    }),

  // [POST] /api/trpc/auth.resetPassword
  resetPassword: publicProcedure
    .input(schemas.resetPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const verifier = await ctx.db.verifier.findUnique({
        where: { token: input.token },
      })
      if (!verifier)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message:
            'This reset link is invalid or has expired. Please request a new one.',
        })

      if (new Date() > verifier.expiresAt)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message:
            'This reset link has expired. Please request a new password reset.',
        })

      const user = await ctx.db.user.update({
        where: { id: verifier.userId },
        data: {
          password: await hashPassword(input.password),
        },
      })
      await ctx.db.verifier.deleteMany({
        where: {
          OR: [{ token: verifier.token }, { expiresAt: { lte: new Date() } }],
        },
      })
      await ctx.db.session.deleteMany({ where: { userId: user.id } })

      await sendEmail({ type: 'ChangePassword', data: user })

      return { success: true }
    }),
} satisfies TRPCRouterRecord
