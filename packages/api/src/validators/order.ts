import { z } from 'zod'

import { Status } from '@yuki/db'

export const getAllSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
})
export type GetAllSchema = z.infer<typeof getOneSchema>

export const getOneSchema = z.object({
  id: z.number(),
})
export type GetOneSchema = z.infer<typeof getOneSchema>

export const updateOrderSchema = getOneSchema.merge(
  z.object({ status: z.nativeEnum(Status), addressId: z.string().optional() }),
)
export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>
