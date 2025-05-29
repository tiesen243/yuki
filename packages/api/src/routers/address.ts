import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { and, eq } from '@yuki/db'
import { addresses } from '@yuki/db/schema'
import { addSchema, byIdSchema } from '@yuki/validators/address'

import { protectedProcedure } from '../trpc'

export const addressRouter = {
  all: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.addresses.findMany({
      where: (addresses, { eq }) => eq(addresses.userId, ctx.session.user.id),
      orderBy: (addresses, { desc }) => desc(addresses.createdAt),
    })
  }),

  byId: protectedProcedure.input(byIdSchema).query(async ({ ctx, input }) => {
    const [address] = await ctx.db
      .select({
        name: addresses.name,
        phone: addresses.phone,
        address: addresses.address,
        city: addresses.city,
        state: addresses.state,
        country: addresses.country,
        zipCode: addresses.zipCode,
      })
      .from(addresses)
      .where(
        and(
          eq(addresses.id, input.id),
          eq(addresses.userId, ctx.session.user.id),
        ),
      )

    if (!address)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Address not found' })
    return address
  }),

  add: protectedProcedure.input(addSchema).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(addresses).values({
      ...input,
      id: undefined,
      userId: ctx.session.user.id,
      isDefault: (await ctx.db.$count(addresses)) === 0,
    })

    return true
  }),

  update: protectedProcedure
    .input(addSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(addresses)
        .set(input)
        .where(
          and(
            eq(addresses.id, input.id ?? ''),
            eq(addresses.userId, ctx.session.user.id),
          ),
        )

      return true
    }),

  setDefault: protectedProcedure
    .input(byIdSchema)
    .mutation(async ({ ctx, input }) => {
      const [address] = await ctx.db
        .select()
        .from(addresses)
        .where(
          and(
            eq(addresses.id, input.id),
            eq(addresses.userId, ctx.session.user.id),
          ),
        )

      if (!address)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Address not found' })

      await ctx.db.transaction(async (tx) => {
        if (!address.isDefault) {
          await tx
            .update(addresses)
            .set({ isDefault: false })
            .where(eq(addresses.userId, ctx.session.user.id))

          await tx
            .update(addresses)
            .set({ isDefault: true })
            .where(
              and(
                eq(addresses.id, input.id),
                eq(addresses.userId, ctx.session.user.id),
              ),
            )
        }
      })

      return true
    }),

  remove: protectedProcedure
    .input(byIdSchema)
    .mutation(async ({ ctx, input }) => {
      const [address] = await ctx.db
        .select()
        .from(addresses)
        .where(
          and(
            eq(addresses.id, input.id),
            eq(addresses.userId, ctx.session.user.id),
          ),
        )
      if (address?.isDefault)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot delete default address',
        })

      await ctx.db
        .delete(addresses)
        .where(
          and(
            eq(addresses.id, input.id),
            eq(addresses.userId, ctx.session.user.id),
          ),
        )

      return true
    }),
} satisfies TRPCRouterRecord
