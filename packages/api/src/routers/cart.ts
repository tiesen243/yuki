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

    const total = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    )

    return { ...cart, total }
  }),

  // [POST] /api/trpc/cart.updateCart
  updateCart: protectedProcedure
    .input(cartSchema)
    .mutation(async ({ ctx, input: { productId, quantity, isUpdate } }) => {
      const userId = ctx.session.user.id

      const product = await ctx.db.product.findUnique({ where: { id: productId } })
      if (!product)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

      if (product.stock < quantity)
        throw new TRPCError({
          code: 'UNPROCESSABLE_CONTENT',
          message: 'Insufficient stock',
        })

      let cart = await ctx.db.cart.findFirst({ where: { userId, status: 'NEW' } })
      if (!cart) cart = await ctx.db.cart.create({ data: { userId } })

      if (isUpdate)
        return await ctx.db.cartItem.update({
          where: { cartId_productId: { cartId: cart.id, productId } },
          data: { quantity },
        })
      else
        return await ctx.db.cartItem.upsert({
          where: { cartId_productId: { cartId: cart.id, productId } },
          create: { cartId: cart.id, productId, quantity },
          update: { quantity: { increment: quantity } },
        })
    }),

  // [POST] /api/trpc/cart.deleteItemFromCart
  deleteItemFromCart: protectedProcedure
    .input(cartSchema)
    .mutation(async ({ ctx, input }) => {
      const cart = await ctx.db.cart.findUnique({ where: { id: input.cartId } })
      if (!cart) throw new TRPCError({ code: 'NOT_FOUND', message: 'Cart not found' })

      try {
        await ctx.db.cartItem.delete({
          where: { cartId_productId: { cartId: cart.id, productId: input.productId } },
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
