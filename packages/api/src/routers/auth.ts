import type { TRPCRouterRecord } from '@trpc/server'
import { sha256 } from '@oslojs/crypto/sha2'
import { encodeHexLowerCase } from '@oslojs/encoding'
import { TRPCError } from '@trpc/server'

import { Password } from '@yuki/auth'
import { sendEmail } from '@yuki/email'
import { env } from '@yuki/email/env'

import { protectedProcedure, publicProcedure } from '../trpc'
import * as schemas from '../validators/auth'

const password = new Password()

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

      await sendEmail({ type: 'Welcome', data: input })

      const gravatarHash = encodeHexLowerCase(
        sha256(new TextEncoder().encode(input.email)),
      )
      return await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          image: `https://www.gravatar.com/avatar/${gravatarHash}?s=256`,
          password: password.hash(input.password),
        },
      })
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
        if (!password.verify(input.currentPassword, user.password))
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid password',
          })
      }

      await ctx.db.session.deleteMany()

      await ctx.db.user.update({
        where: { id: user.id },
        data: { password: password.hash(input.newPassword) },
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

      const bytes = new Uint8Array(20)
      crypto.getRandomValues(bytes)
      const token = encodeHexLowerCase(bytes)

      const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
      const code = await ctx.db.verifier.create({
        data: { token, userId: user.id, expiresAt },
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
        data: { password: password.hash(input.password) },
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
