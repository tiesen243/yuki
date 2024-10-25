import { TRPCError } from '@trpc/server'

import { lucia, Scrypt } from '@yuki/auth/lucia'
import { sendEmail } from '@yuki/email'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { authSchema as schema } from '../validators/auth'

export const authRouter = createTRPCRouter({
  // [POST] /api/trpc/auth.signUp
  signUp: publicProcedure.input(schema.signUp).mutation(async ({ input, ctx }) => {
    const isEmailTaken = await ctx.db.user.findUnique({ where: { email: input.email } })
    if (isEmailTaken) throw new TRPCError({ code: 'CONFLICT', message: 'Email already taken' })

    const user = await ctx.db.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: await new Scrypt().hash(input.password),
      },
    })

    await sendEmail({
      type: 'Welcome',
      email: user.email,
      subject: 'Welcome to our platform!',
      preview: 'You have successfully created an account',
      data: { name: user.name },
    })

    return true
  }),

  // [POST] /api/trpc/auth.signIn
  signIn: publicProcedure.input(schema.signIn).mutation(async ({ input, ctx }) => {
    const user = await ctx.db.user.findUnique({ where: { email: input.email } })
    if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
    if (!user.password)
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'User has no password' })

    const isPasswordCorrect = await new Scrypt().verify(user.password, input.password)
    if (!isPasswordCorrect)
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Incorrect password' })

    return user
  }),

  // [POST] /api/trpc/auth.unlinkDiscord
  unlinkDiscord: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.update({ where: { id: ctx.session.user.id }, data: { discord: null } })
    await sendEmail({
      type: 'UnlinkDiscord',
      email: ctx.session.user.email,
      subject: 'You have unlinked your Discord account',
      preview: 'You have successfully unlinked your Discord account from your Yuki account.',
      data: { name: ctx.session.user.name },
    })
    return true
  }),

  // [POST] /api/trpc/auth.changePassword
  changePassword: protectedProcedure
    .input(schema.changePassword)
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.password && input.currentPassword) {
        const isPasswordCorrect = await new Scrypt().verify(
          ctx.session.user.password,
          input.currentPassword,
        )
        if (!isPasswordCorrect)
          throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Incorrect password' })
      }

      const newPassword = await new Scrypt().hash(input.newPassword)
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { password: newPassword },
      })

      if (input.isLogoutAll) await lucia.invalidateUserSessions(ctx.session.user.id)

      await sendEmail({
        type: 'ChangePassword',
        email: ctx.session.user.email,
        subject: 'Your password has been changed',
        preview: 'You have successfully changed your password',
        data: { name: ctx.session.user.name },
      })

      return true
    }),

  // [POST] /api/trpc/auth.forgotPassword
  forgotPassword: publicProcedure.input(schema.forgotPassword).mutation(async ({ input, ctx }) => {
    const user = await ctx.db.user.findUnique({ where: { email: input.email } })
    if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

    const token = await new Scrypt().hash(`${user.id}-${Date.now()}`)
    await ctx.db.user.update({
      where: { id: user.id },
      data: { resetToken: token },
    })

    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://dashboard.yuki.tiesen.id.vn'
        : 'http://localhost:3001'

    await sendEmail({
      type: 'ResetPassword',
      email: user.email,
      subject: 'Reset your password',
      preview: 'You have requested to reset your password',
      data: {
        name: user.name,
        link: `${baseUrl}/forgot-password/reset?token=${token}&email=${user.email}`,
      },
    })

    return { message: 'We have sent you an email with instructions to reset your password' }
  }),

  // [POST] /api/trpc/auth.resetPassword
  resetPassword: publicProcedure.input(schema.resetPassword).mutation(async ({ input, ctx }) => {
    const user = await ctx.db.user.findUnique({ where: { email: input.email } })
    if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

    if (!user.resetToken) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid token' })

    const isTokenValid = user.resetToken === input.token
    if (!isTokenValid) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid token' })

    const newPassword = await new Scrypt().hash(input.password)
    await ctx.db.user.update({
      where: { id: user.id },
      data: { password: newPassword, resetToken: null },
    })

    await lucia.invalidateUserSessions(user.id)

    return true
  }),

  // [POST] /api/trpc/auth.deleteAccount
  deleteAccount: protectedProcedure.input(schema.deleteAccount).mutation(async ({ input, ctx }) => {
    if (ctx.session.user.password) {
      const isPasswordCorrect = await new Scrypt().verify(ctx.session.user.password, input.password)
      if (!isPasswordCorrect)
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Incorrect password' })
    }

    await ctx.db.user.delete({ where: { id: ctx.session.user.id } })

    if (ctx.session.user.avatar)
      await ctx.utapi.deleteFiles(ctx.session.user.avatar.split('/').pop() ?? '')
    await lucia.invalidateUserSessions(ctx.session.user.id)

    await sendEmail({
      type: 'DeleteAccount',
      email: ctx.session.user.email,
      subject: 'Account deleted',
      preview: 'You have successfully deleted your account from our platform.',
      data: { name: ctx.session.user.name },
    })

    return true
  }),
})
