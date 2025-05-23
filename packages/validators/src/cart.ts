import * as z from 'zod/v4'

export const addToCartSchema = z.object({
  productId: z.uuid(),
  quantity: z.number().int().min(1).max(100),
  action: z.enum(['increment', 'replace']).default('increment'),
})

export const removeCartItemSchema = z.object({
  productId: z.uuid(),
})
