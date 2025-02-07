import { string, z } from 'zod'

export const cartSchema = z.object({
  productId: string(),
  quantity: z.number().min(1).default(1),
  isUpdate: z.boolean().default(false),
})
export type AddSchema = z.infer<typeof cartSchema>
