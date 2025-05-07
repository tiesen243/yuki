import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { eq } from '@yuki/db'
import { users } from '@yuki/db/schema'
import {
  changePasswordSchema,
  signInSchema,
  signUpSchema,
} from '@yuki/validators/auth'

import { protectedProcedure, publicProcedure } from '../trpc'

export const authRouter = {
  signIn: publicProcedure
    .input(signInSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, input.email),
      })

      if (
        !user?.password ||
        !ctx.passwordService.verify(input.password, user.password)
      )
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Incorrect username or password',
        })

      return user.id
    }),

  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, input.email),
      })

      if (user)
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User with this email already exists',
        })

      await ctx.db
        .insert(users)
        .values({
          name: input.name,
          email: input.email,
          image: '',
          password: ctx.passwordService.hash(input.password),
        })
        .returning()

      return true
    }),

  changePassword: protectedProcedure
    .input(changePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      if (
        ctx.session.user.password &&
        !ctx.passwordService.verify(
          input.currentPassword ?? '',
          ctx.session.user.password,
        )
      )
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid password',
        })

      await ctx.db
        .update(users)
        .set({ password: ctx.passwordService.hash(input.newPassword) })
        .where(eq(users.id, ctx.session.user.id))
        .returning()

      return true
    }),
} satisfies TRPCRouterRecord
