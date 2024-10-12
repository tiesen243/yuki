import { TRPCError } from '@trpc/server'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { productSchema as schema } from '../validators/product'

export const productRouter = createTRPCRouter({
  // [GET] /api/trpc/product.getAll
  getAll: publicProcedure.input(schema.query).query(async ({ input, ctx }) => {
    const products = await ctx.db.product.findMany({
      where: { ...(input.q && { name: { contains: input.q, mode: 'insensitive' } }) },
      take: input.limit,
      skip: input.limit * (input.page - 1),
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    })

    if (products.length === 0) return { products: [], totalPage: 0 }

    const totalPage = Math.ceil((await ctx.db.product.count()) / input.limit)

    return {
      products,
      totalPage,
    }
  }),

  // [GET] /api/trpc/product.getOne
  getOne: publicProcedure.input(schema.getOne).query(async ({ input, ctx }) => {
    const product = await ctx.db.product.findUnique({
      where: { id: input.id },
      include: { category: true, owner: true, comments: { include: { user: true } } },
    })
    if (!product) throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

    const relatedProducts = await ctx.db.product.findMany({
      where: { category: { id: product.categoryId }, NOT: { id: input.id } },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    })

    const avgStars =
      product.comments.length === 0
        ? 0
        : product.comments.reduce((acc, comment) => acc + comment.stars, 0) /
          product.comments.length

    return {
      product,
      relatedProducts,
      avgStars,
    }
  }),

  // [POST] /api/trpc/product.create
  create: protectedProcedure.input(schema.create).mutation(async ({ input, ctx }) => {
    const product = await ctx.db.product.create({
      data: {
        name: input.name,
        description: input.description,
        category: { connect: { id: input.category } },
        ...(input.image && { image: input.image }),
        price: input.price,
        stock: input.stock,
        owner: { connect: { id: ctx.session.user.id } },
      },
    })
    return product
  }),

  // [POST] /api/trpc/product.update
  update: protectedProcedure.input(schema.update).mutation(async ({ input, ctx }) => {
    const product = await ctx.db.product.findUnique({ where: { id: input.id } })
    if (!product) throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

    const updatedProduct = await ctx.db.product.update({
      where: { id: input.id },
      data: {
        name: input.name ?? product.name,
        description: input.description ?? product.description,
        price: input.price ?? product.price,
        stock: input.stock ?? product.stock,
        ...(input.image && { image: input.image }),
        ...(input.category && { category: { connect: { id: input.category } } }),
      },
    })

    if (product.image !== updatedProduct.image)
      await ctx.utapi.deleteFiles([product.image.split('/').pop() ?? ''])

    return updatedProduct
  }),

  // [POST] /api/trpc/product.comment
  comment: protectedProcedure.input(schema.comment).mutation(async ({ input, ctx }) => {
    await ctx.db.comment.create({
      data: {
        stars: input.stars,
        content: input.content,
        user: { connect: { id: ctx.session.user.id } },
        product: { connect: { id: input.productId } },
      },
    })
    return { message: 'Comment created' }
  }),

  // [POST] /api/trpc/product.deleteComment
  deleteComment: protectedProcedure.input(schema.getOne).mutation(async ({ input, ctx }) => {
    const comment = await ctx.db.comment.findUnique({ where: { id: input.id } })
    if (!comment) throw new TRPCError({ code: 'NOT_FOUND', message: 'Comment not found' })

    await ctx.db.comment.delete({ where: { id: input.id } })
    return comment
  }),

  // [POST] /api/trpc/product.delete
  delete: protectedProcedure.input(schema.getOne).mutation(async ({ input, ctx }) => {
    const product = await ctx.db.product.findUnique({ where: { id: input.id } })
    if (!product) throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

    await ctx.db.product.delete({ where: { id: input.id } })
    if (product.image.startsWith('https'))
      await ctx.utapi.deleteFiles([product.image.split('/').pop() ?? ''])

    return product
  }),
})
