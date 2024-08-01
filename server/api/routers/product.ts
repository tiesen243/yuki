import { TRPCError } from '@trpc/server'

import { productSchema } from '@/server/api/schemas/product'
import { adminProcedure, createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { utapi } from '@/server/uploadthing'

export const productRouter = createTRPCRouter({
  // [GET] /api/trpc/product.getAdminProducts
  getProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany({
      include: {
        user: true,
        category: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      image: product.image,
      category: product.category,
      price: product.price,
      stock: product.stock,
      sold: product.sold,
      createdBy: product.user,
      createdAt: product.createdAt.toDateString(),
    }))
  }),

  // [GET] /api/trpc/product.getProduct
  getProduct: publicProcedure.input(productSchema.id).query(async ({ ctx, input }) => {
    const product = await ctx.db.product.findUnique({
      where: { id: input.id },
      include: {
        user: true,
        category: { select: { id: true, name: true } },
      },
    })
    if (!product) throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

    return {
      id: product.id,
      name: product.name,
      image: product.image,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      sold: product.sold,
      createdBy: product.user,
      createdAt: product.createdAt.toDateString(),
    }
  }),

  // [POST] /api/trpc/product.createProduct
  createProduct: adminProcedure
    .input(productSchema.createProduct)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.create({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          stock: input.stock,
          sold: 0,
          image: input.image,
          category: { connect: { id: input.category } },
          user: { connect: { id: ctx.user.id } },
        },
      })
      if (!product)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create product' })

      return { success: true }
    }),

  // [POST] /api/trpc/product.updateProduct
  updateProduct: adminProcedure
    .input(productSchema.updateProduct)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({ where: { id: input.id } })
      if (!product) throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

      const updatedProduct = await ctx.db.product.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          stock: input.stock,
          image: input.image,
          category: { connect: { id: input.category } },
        },
      })
      if (!updatedProduct)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update product' })

      if (product.image !== updatedProduct.image)
        await utapi.deleteFiles(product.image.split('/').pop() ?? '')

      return { success: true }
    }),

  // [POST] /api/trpc/product.deleteProduct
  deleteProduct: adminProcedure.input(productSchema.id).mutation(async ({ ctx, input }) => {
    const product = await ctx.db.product.findUnique({ where: { id: input.id } })
    if (!product) throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

    await ctx.db.product.delete({ where: { id: input.id } })
    await utapi.deleteFiles(product.image.split('/').pop() ?? '')

    return { success: true }
  }),
})