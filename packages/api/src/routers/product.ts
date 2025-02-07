import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { protectedProcedure, publicProcedure } from '../trpc'
import { createSchema, getOneSchema, query, updateSchema } from '../validators/product'

export const productRouter = {
  /** Get product section */
  getAll: publicProcedure.input(query).query(async ({ ctx, input }) => {
    return ctx.db.product.findMany({
      where: { name: { contains: input.query, mode: 'insensitive' }, stock: { gt: 0 } },
      take: input.limit,
      skip: (input.page - 1) * input.limit,
      orderBy: { createdAt: 'desc' },
      include: { category: { select: { id: true, name: true } } },
    })
  }),
  getOne: publicProcedure.input(getOneSchema).query(async ({ ctx, input }) => {
    const product = await ctx.db.product.findUnique({
      where: { id: input.id },
      include: {
        _count: { select: { reviews: true, carts: true } },
        reviews: { select: { rating: true } },
      },
    })
    if (!product) throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

    const averageRating =
      product.reviews.reduce((acc, cur) => acc + cur.rating, 0) / product._count.reviews

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      stock: product.stock,
      rating: product._count.reviews !== 0 ? averageRating : 0,
      evaluations: product._count.reviews,
      sold: product._count.carts,
    }
  }),
  getProductReviews: publicProcedure.input(getOneSchema).query(async ({ ctx, input }) => {
    const reviews = await ctx.db.review.findMany({
      where: { product: { id: input.id } },
      include: { user: { select: { id: true, name: true, image: true } } },
    })

    const averageRating =
      reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length

    return {
      reviews,
      rating: reviews.length <= 0 ? 0 : averageRating,
    }
  }),
  getRelativeProducts: publicProcedure
    .input(getOneSchema)
    .query(async ({ ctx, input }) => {
      const c = await ctx.db.category.findFirst({
        where: { products: { some: { id: input.id } } },
        include: { products: true },
      })

      return c?.products ?? []
    }),

  /** Create product section */
  create: protectedProcedure.input(createSchema).mutation(async ({ ctx, input }) => {
    checkAdmin(ctx.session.user.role)
    return ctx.db.product.create({
      data: {
        ...input,
        userId: ctx.session.user.id,
      },
    })
  }),

  /** Update product section */
  update: protectedProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      checkAdmin(ctx.session.user.role)
      return ctx.db.product.update({ where: { id }, data })
    }),

  /** Delete product section */
  delete: protectedProcedure.input(getOneSchema).mutation(async ({ ctx, input }) => {
    checkAdmin(ctx.session.user.role)
    return ctx.db.product.delete({ where: { id: input.id } })
  }),
} satisfies TRPCRouterRecord

const checkAdmin = (role: 'USER' | 'ADMIN') => {
  if (role !== 'ADMIN')
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not authorized to access this resource',
    })
}
