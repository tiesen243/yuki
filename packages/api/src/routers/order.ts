import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import { and, eq, sql } from '@yuki/db'
import { addresses, orderItems, orders, products } from '@yuki/db/schema'
import { byIdOrStatusSchema, updateCartSchema } from '@yuki/validators/order'

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
      const whereCondition = input.id
        ? eq(orders.id, input.id)
        : input.status
          ? eq(orders.status, input.status)
          : undefined

      const orderQuery = {
        id: orders.id,
        status: orders.status,
        totalAmount: orders.totalAmount,
        addressId: orders.addressId,
        createdAt: orders.createdAt,
      }

      const userId = ctx.session.user.id

      return ctx.db.transaction(async (tx) => {
        let [order] = await tx
          .select(orderQuery)
          .from(orders)
          .where(and(whereCondition, eq(orders.userId, userId)))
          .limit(1)

        if (!order) {
          const [address] = await tx
            .select({ id: addresses.id })
            .from(addresses)
            .where(
              and(eq(addresses.userId, userId), eq(addresses.default, true)),
            )
            .limit(1)

          if (!address)
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Add your address first',
            })

          const [newOrder] = await tx
            .insert(orders)
            .values({ userId, totalAmount: 0, addressId: address.id })
            .returning({ id: orders.id, addressId: orders.addressId })

          if (!newOrder)
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to create order',
            })

          order = {
            ...newOrder,
            status: 'new',
            totalAmount: 0,
            createdAt: new Date(),
          }
        }

        const [items, [address]] = await Promise.all([
          tx
            .select({
              productId: orderItems.productId,
              quantity: orderItems.quantity,
              price: orderItems.price,
              name: products.name,
              image: products.image,
            })
            .from(orderItems)
            .where(eq(orderItems.orderId, order.id))
            .innerJoin(products, eq(orderItems.productId, products.id)),
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
          const [address] = await tx
            .select({ id: addresses.id })
            .from(addresses)
            .where(
              and(eq(addresses.userId, userId), eq(addresses.default, true)),
            )
            .limit(1)

          if (!address) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Add your address first',
            })
          }

          const [newOrder] = await tx
            .insert(orders)
            .values({ userId, totalAmount: 0, addressId: address.id })
            .returning({ id: orders.id, addressId: orders.addressId })

          if (!newOrder) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to create order',
            })
          }
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
              quantityAction === 'increment'
                ? existingItem.quantity + quantity
                : quantity

            await tx
              .update(orderItems)
              .set({ quantity: newQuantity, price })
              .where(itemWhere)
          } else {
            await tx
              .insert(orderItems)
              .values({ orderId: order.id, productId, price, quantity })
          }
        }

        const [totalResult] = await tx
          .select({
            totalAmount: sql<number>`COALESCE(sum(${orderItems.quantity} * ${orderItems.price}), 0)`,
          })
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id))

        if (!totalResult) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to calculate total price',
          })
        }

        await tx.update(orders).set(totalResult).where(eq(orders.id, order.id))
      })
    }),
} satisfies TRPCRouterRecord
