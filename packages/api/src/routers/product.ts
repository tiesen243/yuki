import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { publicProcedure, restrictedProcedure } from '../trpc'
import * as schemas from '../validators/product'

export const productRouter = {
  // [GET] /api/trpc/product.getAll
  getAll: publicProcedure.input(schemas.query).query(async ({ ctx, input }) => {
    const where = {
      name: { contains: input.q, mode: 'insensitive' as const },
      categoryId: { contains: input.category, mode: 'insensitive' as const },
      stock: { gt: 0 },
    }

    const [baseProducts, totalCount] = await Promise.all([
      ctx.db.product.findMany({
        where,
        take: input.limit,
        skip: (input.page - 1) * input.limit,
        orderBy: { [input.sortBy]: input.orderBy },
        include: {
          category: { select: { name: true } },
          reviews: { select: { rating: true } },
        },
      }),
      ctx.db.product.count({ where }),
    ])

    const products = baseProducts.map((product) => ({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category.name,
      averageRating:
        product.reviews.length > 0
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
            product.reviews.length
          : 0,
    }))

    const totalPage = Math.ceil(totalCount / input.limit)

    return { products, totalPage }
  }),

  // [GET] /api/trpc/product.getOne
  getOne: publicProcedure
    .input(schemas.getOneSchema)
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: { id: input.id },
        include: {
          _count: { select: { reviews: true } },
          category: { select: { id: true, name: true } },
          reviews: { select: { rating: true } },
          carts: {
            where: { cart: { status: 'DELIVERED' } },
            select: { quantity: true },
          },
        },
      })
      if (!product)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

      const averageRating =
        product._count.reviews > 0
          ? product.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
            product._count.reviews
          : 0

      const soldQuantity = product.carts.reduce(
        (acc, cur) => acc + cur.quantity,
        0,
      )

      return {
        ...product,
        rating: averageRating,
        reviews: product._count.reviews,
        sold: soldQuantity,
      }
    }),

  // [GET] /api/trpc/product.getProductReviews
  getProductReviews: publicProcedure
    .input(schemas.getReviewsSchema)
    .query(async ({ ctx, input }) => {
      const [reviews, reviewStats] = await Promise.all([
        ctx.db.review.findMany({
          where: { product: { id: input.productId } },
          take: input.limit,
          skip: input.limit * (input.page - 1),
          include: { user: { select: { id: true, name: true, image: true } } },
        }),
        ctx.db.review.aggregate({
          where: { product: { id: input.productId } },
          _count: true,
          _avg: { rating: true },
        }),
      ])

      const totalPage = Math.ceil(reviewStats._count / input.limit)

      return {
        reviews,
        rating: reviewStats._count <= 0 ? 0 : (reviewStats._avg.rating ?? 0),
        totalPage,
      }
    }),

  // [GET] /api/trpc/product.getRelativeProducts
  getRelativeProducts: publicProcedure
    .input(schemas.getOneSchema)
    .query(async ({ ctx, input }) => {
      const c = await ctx.db.category.findFirst({
        where: { products: { some: { id: input.id } } },
        include: {
          products: {
            take: 12,
            include: { category: { select: { name: true } } },
          },
        },
      })

      if (!c) return []
      return c.products
    }),

  // [POST] /api/trpc/product.create
  create: restrictedProcedure
    .input(schemas.createProductSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.create({
        data: { ...input, userId: ctx.session.user.id },
      })
    }),

  // [POST] /api/trpc/product.update
  update: restrictedProcedure
    .input(schemas.updateProductSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      const product = await ctx.db.product.findUnique({
        where: { id, userId: ctx.session.user.id },
      })
      if (!product)
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Not authorized to update this product',
        })

      return ctx.db.product.update({ where: { id }, data })
    }),

  // [POST] /api/trpc/product.delete
  delete: restrictedProcedure
    .input(schemas.getOneSchema)
    .mutation(async ({ ctx, input: { id } }) => {
      const product = await ctx.db.product.findUnique({
        where: { id, userId: ctx.session.user.id },
      })
      if (!product)
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Not authorized to update this product',
        })

      return ctx.db.product.delete({ where: { id } })
    }),
} satisfies TRPCRouterRecord
