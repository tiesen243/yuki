import { TRPCError } from '@trpc/server'

import { sendEmail } from '@yuki/email'

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
  getOne: publicProcedure.input(schema.getOne).query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: input.id },
      include: { _count: { select: { products: true } } },
    })
    if (!user) throw new Error('User not found')

    const products = await ctx.db.product.findMany({
      where: { ownerId: user.id },
      take: input.limit,
      skip: input.limit * (input.page - 1),
      orderBy: { createdAt: 'desc' },
      include: { category: true, comments: { select: { stars: true } } },
    })

    const totalRating = products.map((product) => product.comments).flat()
    const rating = totalRating.reduce((acc, curr) => acc + curr.stars, 0) / totalRating.length || 0

    const totalPage = Math.ceil(user._count.products / input.limit)

    return { user, rating, products, totalPage }
  }),

  // [POST] /api/trpc/user.updateRole
  updateRole: protectedProcedure.input(schema.updateRole).mutation(async ({ ctx, input }) => {
    if (ctx.session.user.role !== 'ADMIN')
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You are not allowed to perform this action',
      })

    // check if only have 1 admin, if yes, return error
    const adminCount = await ctx.db.user.count({ where: { role: 'ADMIN' } })
    if (adminCount === 1 && input.role !== 'ADMIN')
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You cannot remove the last admin',
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
        address: { address: input.address, state: input.state, country: input.country },
      },
    })

    if (ctx.session.user.avatar && input.avatar !== ctx.session.user.avatar)
      await ctx.utapi.deleteFiles(ctx.session.user.avatar.split('/').pop() ?? '')

    return user
  }),

  // [POST] /api/trpc/user.delete
  delete: protectedProcedure.input(schema.getOne).mutation(async ({ ctx, input }) => {
    if (ctx.session.user.role !== 'ADMIN')
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You are not allowed to perform this action',
      })

    if (ctx.session.user.id === input.id)
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You cannot delete yourself',
      })

    const user = await ctx.db.user.delete({ where: { id: input.id } })
    if (user.avatar) await ctx.utapi.deleteFiles(user.avatar.split('/').pop() ?? '')

    await sendEmail({
      type: 'AdminDeleteAccount',
      email: user.email,
      subject: 'Your account has been deleted',
      preview: 'Your account has been deleted from our platform by an admin',
      data: { name: user.name },
    })

    return user
  }),

  // [POST] /api/trpc/user.deleteProfile
  deleteProfile: protectedProcedure.input(schema.deleteProfile).mutation(async ({ ctx }) => {
    const user = await ctx.db.user.delete({ where: { id: ctx.session.user.id } })
    if (user.avatar) await ctx.utapi.deleteFiles(user.avatar.split('/').pop() ?? '')

    await sendEmail({
      type: 'DeleteAccount',
      email: user.email,
      subject: 'Account deleted',
      preview: 'You have successfully deleted your account from our platform.',
      data: { name: user.name },
    })

    return user
  }),
})
