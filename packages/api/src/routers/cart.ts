import type { TRPCRouterRecord } from '@trpc/server'
import { TRPCError } from '@trpc/server'

import type { Cart, CartItem } from '@yuki/redis/schema'
import { eq, inArray } from '@yuki/db'
import { products } from '@yuki/db/schema'
import { addToCartSchema, removeCartItemSchema } from '@yuki/validators/cart'

import { protectedProcedure } from '../trpc'

export const cartRouter = {
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const cartKey = `cart:${ctx.session.user.id}`
    const cart = await ctx.redis.get<Cart>(cartKey)

    if (!cart) return null
    if (cart.items.length === 0) return cart

    const productIds = cart.items.map((item) => item.productId)
    const productsInDb = await ctx.db
      .select()
      .from(products)
      .where(inArray(products.id, productIds))
      .limit(productIds.length)

    const itemMap = new Map(
      cart.items.map((item) => [item.productId, item.quantity]),
    )

    return {
      ...cart,
      items: productsInDb.map((product) => ({
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        productPrice: product.price,
        quantity: itemMap.get(product.id) ?? 0,
      })),
    }
  }),

  addItem: protectedProcedure
    .input(addToCartSchema)
    .mutation(async ({ ctx, input }) => {
      const { productId, quantity } = input
      const cartKey = `cart:${ctx.session.user.id}`
      const currentTime = Date.now()

      const [product] = await ctx.db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1)
      if (!product)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

      if (product.stock < quantity)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Not enough stock available. Available: ${product.stock}`,
        })

      const existingCart = await ctx.redis.get<Cart>(cartKey)
      const newItem: CartItem = {
        productId,
        productName: product.name,
        productImage: product.image,
        productPrice: product.price,
        quantity,
      }

      if (!existingCart) {
        const newCart: Cart = {
          items: [newItem],
          total: product.price * quantity,
          createdAt: currentTime,
        }
        await ctx.redis.set(cartKey, newCart)
        return { success: true }
      }

      const existingItemIndex = existingCart.items.findIndex(
        (item) => item.productId === productId,
      )

      if (existingItemIndex >= 0 && existingCart.items[existingItemIndex]) {
        const newQuantity =
          existingCart.items[existingItemIndex].quantity + quantity

        if (newQuantity > product.stock)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `Not enough stock available. Available: ${product.stock}`,
          })

        existingCart.items[existingItemIndex].quantity = newQuantity
      } else existingCart.items.push(newItem)

      existingCart.total = calculateCartTotal(existingCart.items)
      await ctx.redis.set(cartKey, existingCart)

      return { success: true }
    }),

  updateItem: protectedProcedure
    .input(addToCartSchema)
    .mutation(async ({ ctx, input }) => {
      const { productId, quantity, action } = input
      const cartKey = `cart:${ctx.session.user.id}`

      const existingCart = await ctx.redis.get<Cart>(cartKey)
      if (!existingCart)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Cart not found' })

      const [product] = await ctx.db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1)

      const existingItemIndex = existingCart.items.findIndex(
        (item) => item.productId === productId,
      )

      if (
        existingItemIndex < 0 ||
        !existingCart.items[existingItemIndex] ||
        !product
      )
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Product not found' })

      let newQuantity = quantity
      if (action === 'increment')
        newQuantity = existingCart.items[existingItemIndex].quantity + quantity

      if (newQuantity > product.stock)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Not enough stock available. Available: ${product.stock}`,
        })

      existingCart.items[existingItemIndex].quantity = newQuantity
      existingCart.items[existingItemIndex].productPrice = product.price
      existingCart.total = calculateCartTotal(existingCart.items)
      await ctx.redis.set(cartKey, existingCart)

      return { success: true }
    }),

  removeItem: protectedProcedure
    .input(removeCartItemSchema)
    .mutation(async ({ ctx, input }) => {
      const cartKey = `cart:${ctx.session.user.id}`
      const existingCart = await ctx.redis.get<Cart>(cartKey)
      if (!existingCart)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Cart not found' })

      const existingItemIndex = existingCart.items.findIndex(
        (item) => item.productId === input.productId,
      )
      if (existingItemIndex < 0 || !existingCart.items[existingItemIndex])
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Item not found' })

      existingCart.items.splice(existingItemIndex, 1)
      existingCart.total = calculateCartTotal(existingCart.items)
      await ctx.redis.set(cartKey, existingCart)

      return { success: true }
    }),
} satisfies TRPCRouterRecord

function calculateCartTotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + item.productPrice * item.quantity,
    0,
  )
}
