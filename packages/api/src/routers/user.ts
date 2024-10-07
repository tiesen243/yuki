import { TRPCError } from '@trpc/server'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { userSchema as schema } from '../validators/user'

export const userRouter = createTRPCRouter({
  // [GET] /api/trpc/user.getAll
  getAll: publicProcedure.input(schema.query).query(async ({ ctx, input }) => {
    const users = await ctx.db.user.findMany({
      where: {
        ...(input.q && {
          OR: [
            { name: { contains: input.q, mode: 'insensitive' } },
            { email: { contains: input.q, mode: 'insensitive' } },
          ],
        }),
      },
      take: input.limit,
      skip: input.limit * (input.page - 1),
      orderBy: { createdAt: 'desc' },
    })

    const totalPage = Math.ceil((await ctx.db.user.count()) / input.limit)

    return {
      users,
      totalPage,
    }
  }),

  // [GET] /api/trpc/user.getOne
  getOne: publicProcedure.input(schema.getOne).query(async ({ ctx, input: { id } }) => {
    const user = await ctx.db.user.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    })
    if (!user) throw new Error('User not found')

    const products = await ctx.db.product.findMany({
      where: { ownerId: id },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    })

    return { user, products }
  }),

  // [POST] /api/trpc/user.update
  updateRole: protectedProcedure.input(schema.updateRole).mutation(async ({ ctx, input }) => {
    if (ctx.session.user.role !== 'ADMIN')
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You are not allowed to perform this action',
      })

    const user = await ctx.db.user.update({
      where: { id: input.id },
      data: { role: input.role ?? 'USER' },
    })
    return user
  }),

  // [POST] /api/trpc/user.updateProfile
  updateProfile: protectedProcedure.input(schema.updateProfile).mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: {
        name: input.name,
        avatar: input.avatar,
        address: {
          address: input.address,
          city: input.city,
          state: input.state,
          zipCode: input.zipCode,
          country: input.country,
        },
      },
    })

    if (ctx.session.user.avatar && input.avatar !== ctx.session.user.avatar)
      await ctx.utapi.deleteFiles(ctx.session.user.avatar.split('/').pop() ?? '')

    return user
  }),
})
