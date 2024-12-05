import { TRPCError } from '@trpc/server'

import { lucia, Scrypt } from '@yuki/auth/lucia'
import { sendEmail } from '@yuki/email'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import * as schema from '../validators/user'

export const userRouter = createTRPCRouter({
  // [POST] /api/trpc/user.signUp
  signUp: publicProcedure.input(schema.signUp).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findFirst({ where: { email: input.email } })
    if (user) throw new TRPCError({ code: 'CONFLICT', message: 'User already existed' })

    await sendEmail({ kind: 'Welcome', emails: [input.email], data: { name: input.name } })

    return await ctx.db.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: await new Scrypt().hash(input.password),
      },
    })
  }),

  // [POST] /api/trpc/user.signIn
  signIn: publicProcedure.input(schema.signIn).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findFirst({ where: { email: input.email } })
    if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not existed' })

    if (!user.password)
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User has no password' })
    const isValid = await new Scrypt().verify(user.password, input.password)
    if (!isValid) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Incorrect password' })

    return user
  }),

  // [POST] /api/trpc/user.changePassword
  changePassword: protectedProcedure
    .input(schema.changePassword)
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.password) {
        if (!input.oldPassword)
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Old password is required' })
        const isValid = await new Scrypt().verify(ctx.session.user.password, input.oldPassword)
        if (!isValid) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Incorrect password' })
      }

      await lucia.invalidateUserSessions(ctx.session.userId)

      return await ctx.db.user.update({
        where: { id: ctx.session.userId },
        data: { password: await new Scrypt().hash(input.newPassword) },
      })
    }),

  // [POST] /api/trpc/user.forgotPassword
  forgotPassword: publicProcedure.input(schema.forgotPassword).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findFirst({ where: { email: input.email } })
    if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not existed' })

    await sendEmail({
      kind: 'ForgotPassword',
      emails: [user.email],
      data: { name: user.name, email: user.email, token: await new Scrypt().hash(user.id) },
    })

    return user
  }),

  // [POST] /api/trpc/user.resetPassword
  resetPassword: publicProcedure.input(schema.resetPassword).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findFirst({ where: { email: input.email } })
    if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not existed' })

    const isValid = await new Scrypt().verify(input.token, user.id)
    if (!isValid) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Token is invalid' })

    await lucia.invalidateUserSessions(user.id)

    return await ctx.db.user.update({
      where: { id: user.id },
      data: { password: await new Scrypt().hash(input.password) },
    })
  }),
})
