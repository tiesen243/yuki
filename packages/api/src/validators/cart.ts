import { z } from 'zod'

export const updateCartSchema = z.object({
  cartId: z.number().optional(),
  productId: z.string(),
  quantity: z.number().default(1),
  isUpdate: z.boolean().default(false),
})
export type UpdateCartInput = z.infer<typeof updateCartSchema>
