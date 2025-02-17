import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { sendEmail } from '@yuki/email'

import { protectedProcedure, restrictedProcedure } from '../trpc'
import * as schemas from '../validators/order'

export const orderRouter = {
  // [GET] /api/trpc/order.getAllOrders
  getAllOrders: restrictedProcedure
    .input(schemas.getAllSchema)
    .query(async ({ ctx, input }) => {
      const orders = await ctx.db.cart.findMany({
        where: { status: { not: 'NEW' } },
        take: input.limit,
        skip: (input.page - 1) * input.limit,
        include: { user: true },
      })

      const totalPage = Math.ceil(
        (await ctx.db.cart.count({ where: { status: { not: 'NEW' } } })) / input.limit,
      )

      return {
        orders: orders.map((o) => ({ ...o, id: o.id.toString().padStart(6, '0') })),
        totalPage,
      }
    }),

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

    return orders
  }),

  // [GET] /api/trpc/order.getDetails
  getDetails: protectedProcedure
    .input(schemas.getOneSchema)
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.cart.findUnique({
        where: { id: input.id },
        include: { items: { include: { product: true } }, address: true },
      })
      if (!order) throw new TRPCError({ code: 'NOT_FOUND', message: 'Order not found' })

      if (order.userId !== ctx.session.user.id && ctx.session.user.role !== 'ADMIN')
        throw new TRPCError({
          code: 'FORBIDDEN',
          message:
            'You do not have permission to access this order. Only order owners and administrators can view order details.',
        })

      return {
        ...order,
        id: `ORD${order.id.toString().padStart(6, '0')}`,
      }
    }),

  // [POST] /api/trpc/order.updateOrder
  updateOrder: protectedProcedure
    .input(schemas.updateOrderSchema)
    .mutation(async ({ ctx, input: { id, ...data } }) => {
      const cart = await ctx.db.cart.findUnique({
        where: { id },
      })
      if (!cart) throw new TRPCError({ code: 'NOT_FOUND', message: 'Cart not found' })

      if (data.status !== 'PENDING' && ctx.session.user.role === 'USER')
        throw new TRPCError({ code: 'FORBIDDEN' })

      if (data.status === 'PENDING') {
        if (!data.addressId)
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'You have not selected an address yet.',
          })

        const cartItems = await ctx.db.cartItem.findMany({
          where: { cartId: id },
          include: { product: true },
        })

        if (cartItems.length === 0)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Cart is empty',
          })

        await ctx.db.$transaction((tx) =>
          Promise.all(
            cartItems.map((item) => {
              if (item.quantity > item.product.stock)
                throw new TRPCError({
                  code: 'BAD_REQUEST',
                  message: `Not enough stock for product "${item.product.name}". Available: ${item.product.stock}`,
                })

              return tx.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } },
              })
            }),
          ),
        )
      }

      const cartResult = await ctx.db.cart.update({
        where: { id },
        data,
        include: {
          user: { select: { name: true, email: true } },
          items: {
            include: { product: { select: { name: true, image: true, price: true } } },
          },
          address: true,
        },
      })

      const exitedTemplate = ['PENDING', 'DELIVERED'] as const
      if (exitedTemplate.includes(data.status as (typeof exitedTemplate)[number]))
        await sendEmail({
          type: 'Order',
          data: {
            status: data.status as (typeof exitedTemplate)[number],
            ...cartResult.user,
            order: {
              id: `ORD${cartResult.id.toString().padStart(6, '0')}`,
              address: cartResult.address,
              items: cartResult.items.map((item) => ({
                ...item.product,
                quantity: item.quantity,
              })),
              total: cartResult.total,
            },
          },
        })

      const msg = {
        PENDING: 'Order confirmed successfully',
        DELIVERED: 'Order delivered successfully',
        CANCELED: 'Order canceled',
      } as const

      return { message: msg[data.status as keyof typeof msg] }
    }),
} satisfies TRPCRouterRecord
