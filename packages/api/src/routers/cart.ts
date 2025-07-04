import type { TRPCRouterRecord } from '@trpc/server'

import { and, eq } from '@yuki/db'
import { cartItems } from '@yuki/db/schema'
import { updateCartSchema } from '@yuki/validators/cart'

import { protectedProcedure } from '../trpc'

export const cartRouter = {
  get: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id

    const cartItems = await ctx.db.query.cartItems.findMany({
      where: (t, { eq }) => eq(t.userId, userId),
      with: { product: true },
    })

    const totalPrice = cartItems.reduce((sum, item) => {
      const price = item.product.price * item.quantity
      const discount = item.product.discount / 100
      return sum + price * (1 - discount)
    }, 0)

    return {
      totalPrice: totalPrice.toFixed(2),
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.quantity,
        price: item.product.price,
        discount: item.product.discount,
        totalPrice: (
          item.product.price *
          item.quantity *
          (1 - item.product.discount / 100)
        ).toFixed(2),
      })),
    }
  }),

  update: protectedProcedure
    .input(updateCartSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id
      const { productId, quantity, type } = input

      const where = and(
        eq(cartItems.userId, userId),
        eq(cartItems.productId, productId),
      )

      let cartItem = await ctx.db.query.cartItems.findFirst({ where })
      if (!cartItem) {
        ;[cartItem] = await ctx.db
          .insert(cartItems)
          .values({ userId, productId, quantity })
          .returning()
      } else if (type === 'remove') {
        await ctx.db.delete(cartItems).where(where)
      } else {
        const newQuantity =
          cartItem.quantity + (type === 'increment' ? quantity : 0)
        ;[cartItem] = await ctx.db
          .update(cartItems)
          .set({ quantity: newQuantity })
          .where(where)
          .returning()
      }

      return { success: true }
    }),
} satisfies TRPCRouterRecord
