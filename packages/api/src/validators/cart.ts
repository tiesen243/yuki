import { string, z } from 'zod'

export const cartSchema = z.object({
  cartId: string().optional(),
  productId: string(),
  quantity: z.number().min(1).default(1),
  isUpdate: z.boolean().default(false),
})
export type AddSchema = z.infer<typeof cartSchema>
