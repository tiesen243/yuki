import { TRPCError } from '@trpc/server'
import { Scrypt } from 'lucia'
import { cookies } from 'next/headers'

import { sendEmail } from '@/lib/emails'
import { authSchema } from '@/server/api/schemas/auth'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { lucia } from '@/server/auth/lucia'

export const authRouter = createTRPCRouter({
  // [GET] /api/trpc/auth.me
  me: publicProcedure.query(async ({ ctx }) => {
    return { user: ctx.user, session: ctx.session }
  }),

  // [POST] /api/trpc/auth.signUp
  signUp: publicProcedure.input(authSchema.signUp).mutation(async ({ ctx, input }) => {
    const isEmailExist = await ctx.db.user.findUnique({ where: { email: input.email } })
    if (isEmailExist) throw new TRPCError({ code: 'CONFLICT', message: 'Email already exists' })

    const newUser = await ctx.db.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: await new Scrypt().hash(input.password),
      },
    })
    if (!newUser)
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create user' })

    await sendEmail({
      subject: `Welcome to Yuki`,
      to: input.email,
      name: input.name,
      type: 'welcome',
    })

    return { success: true }
  }),

  // [POST] /api/trpc/auth.signIn
  signIn: publicProcedure.input(authSchema.signIn).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({ where: { email: input.email } })
    if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

    const isPasswordCorrect = await new Scrypt().verify(user.password, input.password)
    if (!isPasswordCorrect)
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Password is incorrect' })

    let sessionCookie
    try {
      const session = await lucia.createSession(user.id, {})
      sessionCookie = lucia.createSessionCookie(session.id)
    } catch (error) {
      sessionCookie = lucia.createBlankSessionCookie()
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create session' })
    }

    return { sessionCookie }
  }),

  // [POST] /api/trpc/auth.signOut
  signOut: protectedProcedure.mutation(async ({ ctx }) => {
    await lucia.invalidateSession(ctx.session.id)

    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return { success: true }
  }),
})