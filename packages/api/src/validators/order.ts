import { z } from 'zod'

import { Status } from '@yuki/db'

export const getOneSchema = z.object({
  id: z.string(),
})
export type GetOne = z.infer<typeof getOneSchema>

export const updateOrderSchema = getOneSchema.merge(
  z.object({ status: z.nativeEnum(Status), addressId: z.string().optional() }),
)
export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>
