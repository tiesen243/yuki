import type { TRPCRouterRecord } from '@trpc/server'

import type { CartItem } from '@yuki/validators/cart'
import { removeFromCartSchema, updateCartSchema } from '@yuki/validators/cart'

import { protectedProcedure } from '../trpc'

export const cartRouter = {
  get: protectedProcedure.query(async ({ ctx }) => {
    let cart: CartItem[] | null = await ctx.redis.get(
      `cart:${ctx.session.user.id}`,
    )

    if (!cart) {
      cart = []
      await ctx.redis.set(`cart:${ctx.session.user.id}`, cart)
    }

    return cart
  }),
  update: protectedProcedure
    .input(updateCartSchema)
    .mutation(async ({ ctx, input: { isIncreate, ...input } }) => {
      const cartKey = `cart:${ctx.session.user.id}`
      const cart: CartItem[] = (await ctx.redis.get(cartKey)) ?? []

      const existingItemIndex = cart.findIndex(
        (cartItem) => cartItem.productId === input.productId,
      )

      if (existingItemIndex !== -1) {
        const item = cart[existingItemIndex] as unknown as CartItem
        item.quantity = isIncreate
          ? item.quantity + input.quantity
          : input.quantity
      } else cart.push(input)
      await ctx.redis.set(cartKey, cart)

      return cart
    }),
  remove: protectedProcedure
    .input(removeFromCartSchema)
    .mutation(async ({ ctx, input }) => {
      const cartKey = `cart:${ctx.session.user.id}`
      const cart: CartItem[] = (await ctx.redis.get(cartKey)) ?? []
      const newCart = cart.filter(
        (cartItem) => cartItem.productId !== input.productId,
      )
      await ctx.redis.set(cartKey, newCart)
      return newCart
    }),
} satisfies TRPCRouterRecord
