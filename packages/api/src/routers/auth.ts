import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { Password } from '@yukinu/auth'
import { and, eq } from '@yukinu/db'
import { accounts, sessions, users } from '@yukinu/db/schema'
import { changePasswordSchema, signUpSchema } from '@yukinu/validators/auth'

import { protectedProcedure, publicProcedure } from '../trpc'

const password = new Password()

export const authRouter = {
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.email, input.email),
        columns: { id: true },
      })
      if (user)
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        })

      await ctx.db.transaction(async (tx) => {
        const [newUser] = await tx
          .insert(users)
          .values({
            email: input.email,
            name: input.name,
            image: '',
          })
          .returning({ id: users.id })
        await tx.insert(accounts).values({
          provider: 'credentials',
          accountId: newUser?.id ?? '',
          userId: newUser?.id ?? '',
          password: await password.hash(input.password),
        })
      })

      return { message: 'User created successfully' }
    }),

  changePassword: protectedProcedure
    .input(changePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      const account = await ctx.db.query.accounts.findFirst({
        where: and(
          eq(accounts.provider, 'credentials'),
          eq(accounts.userId, userId),
        ),
        columns: { password: true },
      })
      if (account?.password && input.currentPassword) {
        const isValid = await password.verify(
          account.password,
          input.currentPassword,
        )
        if (!isValid)
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Current password is incorrect',
          })
      }

      await ctx.db.transaction(async (tx) => {
        const hashedPassword = await password.hash(input.newPassword)

        await tx
          .insert(accounts)
          .values({
            provider: 'credentials',
            accountId: userId,
            userId,
            password: hashedPassword,
          })
          .onConflictDoUpdate({
            target: [accounts.provider, accounts.userId],
            set: { password: hashedPassword },
          })

        if (input.isLogoutAll)
          await tx.delete(sessions).where(eq(sessions.userId, userId))
      })

      return { message: 'Password changed successfully' }
    }),
} satisfies TRPCRouterRecord
