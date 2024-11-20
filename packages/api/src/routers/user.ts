import { TRPCError } from '@trpc/server'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '@yuki/api/trpc'
import { userSchema } from '@yuki/api/validators/user'
import { Scrypt } from '@yuki/auth/lucia'
import { db } from '@yuki/db'
import { sendEmail } from '@yuki/email'

export const userRouter = createTRPCRouter({
  test: publicProcedure.query(async () => {
    await sendEmail({
      email: 'ttien56906@gmail.com',
      subject: 'Test email',
      message: 'Hello world',
      preview: 'Hello world',
      data: { name: 'Tien' },
      type: 'Welcome',
    })
    return { success: true }
  }),

  // [POST] /api/trpc/user.register
  register: publicProcedure.input(userSchema.register).mutation(async ({ input, ctx }) => {
    const existingUser = await ctx.db.user.findUnique({ where: { email: input.email } })
    if (existingUser) throw new TRPCError({ code: 'CONFLICT', message: 'User already exists' })

    const user = await ctx.db.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: await new Scrypt().hash(input.password),
      },
    })

    return { user }
  }),

  // [POST] /api/trpc/user.login
  login: publicProcedure.input(userSchema.login).mutation(async ({ input, ctx }) => {
    const user = await ctx.db.user.findUnique({ where: { email: input.email } })
    if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

    if (!user.password) throw new TRPCError({ code: 'FORBIDDEN', message: 'User has no password' })
    const isValid = await new Scrypt().verify(user.password, input.password)
    if (!isValid) throw new TRPCError({ code: 'FORBIDDEN', message: 'Password is incorrect' })

    return { user }
  }),

  // [POST] /api/trpc/user.changePassword
  changePassword: protectedProcedure
    .input(userSchema.changePassword)
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.password && input.oldPassword) {
        const isValid = await new Scrypt().verify(ctx.session.user.password, input.oldPassword)
        if (!isValid) throw new TRPCError({ code: 'FORBIDDEN', message: 'Password is incorrect' })
      }

      await db.user.update({
        where: { id: ctx.session.userId },
        data: { password: await new Scrypt().hash(input.newPassword) },
      })

      if (input.isSignOutAll === 'on') await ctx.lucia.invalidateUserSessions(ctx.session.userId)

      return { message: 'Change password succesfully' }
    }),
})
