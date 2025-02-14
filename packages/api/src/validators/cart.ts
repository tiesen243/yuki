import { z } from 'zod'

export const cartSchema = z.object({
  cartId: z.number().optional(),
  productId: z.string(),
  quantity: z.number().default(1),
  isUpdate: z.boolean().default(false),
})
export type AddSchema = z.infer<typeof cartSchema>
