import * as z from 'zod/v4'

export const updateCartSchema = z.object({
  productId: z.cuid2(),
  quantity: z.number().int().min(1, { message: 'Quantity must be at least 1' }),
  type: z.enum(['increment', 'replace', 'remove']).default('increment'),
})
