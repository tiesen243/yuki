import { TRPCError } from '@trpc/server'

import { utapi } from '@yuki/uploader'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { productSchema as schema } from '../validators/product'

export const productRouter = createTRPCRouter({
  // [GET] /api/trpc/product.getAll
  getAll: publicProcedure.input(schema.query).query(async ({ input, ctx }) => {
    const products = await ctx.db.product.findMany({
      where: { ...(input.q && { name: { contains: input.q } }) },
      take: input.limit,
      skip: input.limit * (input.page - 1),
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    })
    return products
  }),

  // [GET] /api/trpc/product.getOne
  getOne: publicProcedure.input(schema.getOne).query(async ({ input: { id }, ctx }) => {
    const product = await ctx.db.product.findUnique({ where: { id } })
    if (!product) throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

    const relatedProducts = await ctx.db.product.findMany({
      where: { category: { id: product.categoryId }, NOT: { id } },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    })

    return {
      product,
      relatedProducts,
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
      await utapi.deleteFiles([product.image.split('/').pop() ?? ''])

    return updatedProduct
  }),

  // [POST] /api/trpc/product.delete
  delete: protectedProcedure.input(schema.getOne).mutation(async ({ input, ctx }) => {
    const product = await ctx.db.product.findUnique({ where: { id: input.id } })
    if (!product) throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

    await ctx.db.product.delete({ where: { id: input.id } })
    if (product.image.startsWith('https'))
      await utapi.deleteFiles([product.image.split('/').pop() ?? ''])

    return product
  }),
})
