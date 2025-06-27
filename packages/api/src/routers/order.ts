import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { and, eq, sql } from '@yukinu/db'
import { addresses, orderItems, orders } from '@yukinu/db/schema'
import { byIdOrStatusSchema, updateCartSchema } from '@yukinu/validators/order'

import { protectedProcedure } from '../trpc'

export const orderRouter = {
  all: protectedProcedure.query(async ({ ctx }) =>
    ctx.db
      .select({
        id: orders.id,
        status: orders.status,
        totalAmount: orders.totalAmount,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(eq(orders.userId, ctx.session.user.id)),
  ),

  byIdOrStatus: protectedProcedure
    .input(byIdOrStatusSchema)
    .query(async ({ ctx, input }) => {
      const where = input.id
        ? eq(orders.id, input.id)
        : input.status
          ? eq(orders.status, input.status)
          : undefined

      const query = {
        id: orders.id,
        status: orders.status,
        totalAmount: orders.totalAmount,
        addressId: orders.addressId,
        createdAt: orders.createdAt,
      }

      return ctx.db.transaction(async (tx) => {
        let [order] = await tx
          .select(query)
          .from(orders)
          .where(and(where, eq(orders.userId, ctx.session.user.id)))
          .limit(1)
        if (!order)
          [order] = await tx
            .insert(orders)
            .values({ userId: ctx.session.user.id })
            .returning(query)

        if (!order)
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Order creation failed',
          })

        order.addressId ??= ''
        const [items, [address]] = await Promise.all([
          tx.select().from(orderItems).where(eq(orderItems.orderId, order.id)),
          tx.select().from(addresses).where(eq(addresses.id, order.addressId)),
        ])

        return { ...order, items, address }
      })
    }),

  update: protectedProcedure
    .input(updateCartSchema)
    .mutation(async ({ ctx, input }) => {
      const { productId, price, quantity, action, quantityAction } = input
      const userId = ctx.session.user.id

      await ctx.db.transaction(async (tx) => {
        let order = await tx.query.orders.findFirst({
          where: and(eq(orders.userId, userId), eq(orders.status, 'new')),
          columns: { id: true },
        })
        if (!order) {
          const [newOrder] = await tx
            .insert(orders)
            .values({ userId })
            .returning({ id: orders.id })
          if (!newOrder)
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to create order',
            })
          order = newOrder
        }

        const itemWhere = and(
          eq(orderItems.orderId, order.id),
          eq(orderItems.productId, productId),
        )

        if (action === 'remove') {
          await tx.delete(orderItems).where(itemWhere)
        } else {
          const existingItem = await tx.query.orderItems.findFirst({
            where: itemWhere,
            columns: { quantity: true },
          })
          if (existingItem) {
            const newQuantity =
              quantity + (quantityAction === 'increment' ? quantity : 0)

            await tx
              .update(orderItems)
              .set({ quantity: newQuantity, price })
              .where(itemWhere)
          } else
            await tx
              .insert(orderItems)
              .values({ orderId: order.id, productId, price, quantity })
        }

        const [totalResult] = await tx
          .select({
            totalAmount: sql<number>`COALESCE(sum(${orderItems.quantity} * ${orderItems.price}), 0)`,
          })
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id))
        if (!totalResult)
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to calculate total price',
          })
        await tx.update(orders).set(totalResult).where(eq(orders.id, order.id))
      })
    }),
} satisfies TRPCRouterRecord
