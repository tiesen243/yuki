import type { TRPCRouterRecord } from '@trpc/server'
import { z } from 'zod'

import { protectedProcedure, publicProcedure, restrictedProcedure } from '../trpc'
import * as schemas from '../validators/user'

export const userRouter = {
  // [GET] /api/trpc/user.getAll
  getAll: restrictedProcedure.input(schemas.query).query(async ({ ctx, input }) => {
    const users = await ctx.db.user.findMany({
      where: {
        OR: [
          { name: { contains: input.query, mode: 'insensitive' } },
          { email: { contains: input.query, mode: 'insensitive' } },
        ],
      },
      include: { _count: { select: { carts: true } } },
      take: input.limit,
      skip: (input.page - 1) * input.limit,
      orderBy: { createdAt: 'desc' },
    })

    const totalPage = Math.ceil((await ctx.db.user.count()) / input.limit)

    return {
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        numberOfOrders: user._count.carts,
      })),
      totalPage,
    }
  }),

  // [POST] /api/trpc/user.updateProfile
  updateProfile: protectedProcedure
    .input(schemas.updateProfile)
    .mutation(({ ctx, input }) =>
      ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      }),
    ),

  // [GET] /api/trpc/user.getLinkedAccounts
  getLinkedAccounts: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user) return []
    return ctx.db.account.findMany({
      where: { userId: ctx.session.user.id },
    })
  }),

  // [POST] /api/trpc/user.unlinkAccount
  unlinkAccount: protectedProcedure
    .input(z.object({ provider: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const account = await ctx.db.account.findFirst({
        where: { userId: ctx.session.user.id, provider: input.provider },
      })
      if (!account) return false
      await ctx.db.account.delete({
        where: {
          provider_providerId: {
            provider: account.provider,
            providerId: account.providerId,
          },
        },
      })
      return true
    }),

  // [GET] /api/trpc/user.getAddresses
  getAddresses: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.address.findMany({
      where: { userId: ctx.session.user.id },
    })
  }),

  // [GET] /api/trpc/user.getOneAddress
  getOneAddress: protectedProcedure
    .input(schemas.getOneSchema)
    .query(async ({ ctx, input }) => {
      return ctx.db.address.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
      })
    }),

  // [POST] /api/trpc/user.newAddress
  newAddress: protectedProcedure
    .input(schemas.newAddressSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.address.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      })
    }),

  // [POST] /api/trpc/user.updateAddress
  updateAddress: protectedProcedure
    .input(schemas.updateAddressSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      return ctx.db.address.update({
        where: { id, userId: ctx.session.user.id },
        data,
      })
    }),

  // [POST] /api/trpc/user.deleteAddress
  deleteAddress: protectedProcedure
    .input(schemas.getOneSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.address.delete({
        where: { id: input.id, userId: ctx.session.user.id },
      })
    }),
} satisfies TRPCRouterRecord
