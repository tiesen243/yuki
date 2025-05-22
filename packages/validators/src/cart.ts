import * as z from 'zod/v4'

export const updateCartSchema = z.object({
  productId: z.string(),
  productName: z.string().optional(),
  productImage: z.string().optional(),
  productPrice: z.coerce.number().optional(),
  quantity: z.coerce.number().min(1),
  isIncreate: z.boolean().default(true),
})

export type CartItem = Omit<z.infer<typeof updateCartSchema>, 'isIncreate'>

export const removeFromCartSchema = z.object({
  productId: z.string(),
})
