import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { protectedProcedure, publicProcedure } from '../trpc'
import * as schemas from '../validators/product'

export const productRouter = {
  // [GET] /api/trpc/product.getAll
  getAll: publicProcedure.input(schemas.query).query(async ({ ctx, input }) => {
    const products = await ctx.db.product.findMany({
      where: {
        name: { contains: input.query, mode: 'insensitive' },
        ...(input.category && { categoryId: input.category }),
        stock: { gt: 0 },
      },
      take: input.limit,
      skip: (input.page - 1) * input.limit,
      orderBy: { [input.orderBy]: input.sortBy },
      include: { category: { select: { id: true, name: true } } },
    })

    const totalPage = Math.ceil(
      (await ctx.db.product.count({
        where: {
          name: { contains: input.query, mode: 'insensitive' },
          ...(input.category && { categoryId: input.category }),
          stock: { gt: 0 },
        },
      })) / input.limit,
    )

    return {
      products,
      totalPage,
    }
  }),

  // [GET] /api/trpc/product.getOne
  getOne: publicProcedure.input(schemas.getOneSchema).query(async ({ ctx, input }) => {
    const product = await ctx.db.product.findUnique({
      where: { id: input.id },
      include: {
        _count: { select: { reviews: true } },
        reviews: { select: { rating: true } },
        carts: {
          where: { cart: { status: 'DELIVERED' } },
          select: { quantity: true },
        },
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
      reviews: product._count.reviews,
      sold: product.carts.reduce((acc, cur) => acc + cur.quantity, 0),
    }
  }),

  // [GET] /api/trpc/product.getProductReviews
  getProductReviews: publicProcedure
    .input(schemas.getReviews)
    .query(async ({ ctx, input }) => {
      const limit = 5
      const reviews = await ctx.db.review.findMany({
        where: { product: { id: input.productId } },
        take: limit,
        skip: limit * (input.page - 1),
        include: { user: { select: { id: true, name: true, image: true } } },
      })

      const fullReviews = await ctx.db.review.findMany({
        where: { product: { id: input.productId } },
        select: { rating: true },
      })
      const averageRating =
        fullReviews.reduce((acc, cur) => acc + cur.rating, 0) / fullReviews.length

      const totalPage = Math.ceil(fullReviews.length / limit)

      return {
        reviews,
        rating: fullReviews.length <= 0 ? 0 : averageRating,
        totalPage,
      }
    }),

  // [GET] /api/trpc/product.getRelativeProducts
  getRelativeProducts: publicProcedure
    .input(schemas.getOneSchema)
    .query(async ({ ctx, input }) => {
      const c = await ctx.db.category.findFirst({
        where: { products: { some: { id: input.id } } },
        include: { products: true },
      })

      return c?.products ?? []
    }),

  // [POST] /api/trpc/product.create
  create: protectedProcedure
    .input(schemas.createSchema)
    .mutation(async ({ ctx, input }) => {
      checkAdmin(ctx.session.user.role)
      return ctx.db.product.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      })
    }),

  // [POST] /api/trpc/product.update
  update: protectedProcedure
    .input(schemas.updateSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      checkAdmin(ctx.session.user.role)
      return ctx.db.product.update({ where: { id }, data })
    }),

  // [POST] /api/trpc/product.delete
  delete: protectedProcedure
    .input(schemas.getOneSchema)
    .mutation(async ({ ctx, input }) => {
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
