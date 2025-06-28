import * as z from 'zod/v4'

export const byIdOrStatusSchema = z.object({
  id: z.cuid2().optional(),
  status: z
    .enum(['new', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .optional(),
})

export const updateCartSchema = z.object({
  productId: z.cuid2(),
  price: z.number().min(1),
  quantity: z.number().min(1).max(100),
  action: z.enum(['update', 'remove']),
  quantityAction: z.enum(['replace', 'increment']).default('increment'),
})
