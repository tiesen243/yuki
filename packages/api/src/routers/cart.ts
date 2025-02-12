import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { protectedProcedure } from '../trpc'
import { cartSchema } from '../validators/cart'

export const cartRouter = {
  // [GET] /api/trpc/cart.getCart
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id

    const select = { id: true, name: true, image: true, price: true }
    let cart = await ctx.db.cart.findFirst({
      where: { userId, status: 'NEW' },
      include: {
        items: {
          include: { product: { select } },
          orderBy: { product: { name: 'desc' } },
        },
      },
    })

    if (!cart)
      cart = await ctx.db.cart.create({
        data: { userId },
        include: {
          items: {
            include: { product: { select } },
            orderBy: { product: { name: 'desc' } },
          },
        },
      })

    return cart
  }),

  // [POST] /api/trpc/cart.updateCart
  updateCart: protectedProcedure
    .input(cartSchema)
    .mutation(async ({ ctx, input: { productId, quantity, isUpdate } }) => {
      const userId = ctx.session.user.id

      // Combine cart and existing item query
      const [product, existingCartWithItems] = await Promise.all([
        ctx.db.product.findUnique({
          where: { id: productId },
          select: { stock: true, price: true },
        }),
        ctx.db.cart.findFirst({
          where: { userId, status: 'NEW' },
          include: { items: { where: { productId }, select: { quantity: true } } },
        }),
      ])

      if (!product)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

      const existingQuantity = existingCartWithItems?.items[0]?.quantity ?? 0
      const newQuantity = isUpdate ? quantity : existingQuantity + quantity

      if (newQuantity > product.stock) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Requested quantity exceeds available stock',
        })
      }

      const result = await ctx.db.$transaction(async (tx) => {
        const cart = existingCartWithItems ?? (await tx.cart.create({ data: { userId } }))

        const cartItem = await tx.cartItem.upsert({
          where: { cartId_productId: { cartId: cart.id, productId } },
          create: { cartId: cart.id, productId, quantity },
          update: { quantity: isUpdate ? quantity : { increment: quantity } },
          include: { product: true },
        })

        const cartItems = await tx.cartItem.findMany({
          where: { cartId: cart.id },
          select: { quantity: true, product: { select: { price: true } } },
        })

        const total = cartItems.reduce(
          (sum, item) => sum + item.quantity * item.product.price,
          0,
        )

        await tx.cart.update({
          where: { id: cart.id },
          data: { total },
        })

        return cartItem
      })

      return result
    }),

  // [POST] /api/trpc/cart.deleteItemFromCart
  deleteItemFromCart: protectedProcedure
    .input(cartSchema)
    .mutation(async ({ ctx, input }) => {
      const cart = await ctx.db.cart.findUnique({ where: { id: input.cartId } })
      if (!cart) throw new TRPCError({ code: 'NOT_FOUND', message: 'Cart not found' })

      try {
        const deletedItem = await ctx.db.cartItem.delete({
          where: { cartId_productId: { cartId: cart.id, productId: input.productId } },
          include: { product: { select: { price: true } } },
        })

        await ctx.db.cart.update({
          where: { id: cart.id },
          data: { total: cart.total - deletedItem.quantity * deletedItem.product.price },
        })
      } catch {
        throw new TRPCError({
          code: 'BAD_GATEWAY',
          message: 'Fail to delete item from cart',
        })
      }

      return true
    }),
} satisfies TRPCRouterRecord
