import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { desc, eq } from '@yukinu/db'
import { addresses } from '@yukinu/db/schema'
import { addSchema, byIdSchema, updateSchema } from '@yukinu/validators/address'

import { protectedProcedure } from '../trpc'

export const addressRouter = {
  all: protectedProcedure.query(async ({ ctx }) =>
    ctx.db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, ctx.session.user.id))
      .orderBy(desc(addresses.name)),
  ),

  byId: protectedProcedure.input(byIdSchema).query(async ({ ctx, input }) => {
    const [address] = await ctx.db
      .select()
      .from(addresses)
      .where(eq(addresses.id, input.id))
      .limit(1)
    if (!address)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Address not found' })
    return address
  }),

  add: protectedProcedure.input(addSchema).mutation(async ({ ctx, input }) => {
    const count = await ctx.db.$count(addresses)
    await ctx.db.insert(addresses).values({
      ...input,
      userId: ctx.session.user.id,
      default: count === 0,
    })
    return { message: 'Address added successfully' }
  }),

  update: protectedProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(addresses)
        .set(input)
        .where(eq(addresses.id, input.id))
      return { message: 'Address updated successfully' }
    }),

  remove: protectedProcedure
    .input(byIdSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(addresses).where(eq(addresses.id, input.id))
      return { message: 'Address removed successfully' }
    }),
} satisfies TRPCRouterRecord
