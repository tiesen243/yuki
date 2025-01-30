import { z } from 'zod'

export const query = z.object({
  page: z.number().default(1),
  limit: z.number().default(8),
})
export type Query = z.infer<typeof query>

export const getOneSchema = z.object({ id: z.string() })
export type GetOneInput = z.infer<typeof getOneSchema>

export const createSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().url('Image must be a valid URL'),
})
export type CreateInput = z.infer<typeof createSchema>

export const updateSchema = getOneSchema.merge(createSchema)
export type UpdateInput = z.infer<typeof updateSchema>
