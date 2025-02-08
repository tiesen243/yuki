import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { protectedProcedure } from '../trpc'
import { getOneSchema, updateOrderSchema } from '../validators/order'

export const orderRouter = {
  // [GET] /api/trpc/order.getHistories
  getHistories: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.cart.findMany({
      where: { userId: ctx.session.user.id, status: { not: 'NEW' } },
      include: {
        items: {
          select: {
            quantity: true,
            product: { select: { id: true, name: true, image: true, price: true } },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })

    return orders.map((o) => {
      const price = o.items.reduce(
        (acc, cur) => acc + cur.quantity * cur.product.price,
        0,
      )

      return {
        ...o,
        price,
      }
    })
  }),

  // [GET] /api/trpc/order.getDetails
  getDetails: protectedProcedure.input(getOneSchema).query(async ({ ctx, input }) => {
    const order = await ctx.db.cart.findUnique({
      where: { id: input.id },
      include: {
        items: { include: { product: true } },
      },
    })

    if (!order) throw new TRPCError({ code: 'NOT_FOUND', message: 'Order not found' })

    const price = order.items.reduce(
      (acc, cur) => acc + cur.quantity * cur.product.price,
      0,
    )

    return {
      ...order,
      price,
    }
  }),

  // [POST] /api/trpc/order.updateOrder
  updateOrder: protectedProcedure
    .input(updateOrderSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      const cart = await ctx.db.cart.findUnique({
        where: { id },
      })
      if (!cart) throw new TRPCError({ code: 'NOT_FOUND', message: 'Cart not found' })

      if (data.status !== 'PENDING' && ctx.session.user.role === 'USER')
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized to access this resource',
        })

      if (data.status === 'PENDING' && !data.addressId)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'You have not selected an address yet.',
        })

      if (data.status === 'DELIVERED') {
        const cartItems = await ctx.db.cartItem.findMany({
          where: { cartId: id },
          include: { product: true },
        })

        for (const item of cartItems)
          await ctx.db.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          })
      }

      await ctx.db.cart.update({
        where: { id },
        data,
      })

      const msg = {
        PENDING: 'Order confirmed successfully',
        DELIVERED: 'Order delivered successfully',
        CANCELED: 'Order canceled',
      } as const

      return { message: msg[data.status as keyof typeof msg] }
    }),
} satisfies TRPCRouterRecord
