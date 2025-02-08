import { z } from 'zod'

export const query = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  orderBy: z.enum(['createdAt', 'name', 'price']).default('createdAt'),
  sortBy: z.enum(['asc', 'desc']).default('desc'),
  page: z.number().default(1),
  limit: z.number().default(12),
})
export type Query = z.infer<typeof query>

export const getOneSchema = z.object({ id: z.string() })
export type GetOneInput = z.infer<typeof getOneSchema>

export const getReviews = z.object({ productId: z.string(), page: z.number().default(1) })
export type GetReviews = z.infer<typeof getReviews>

export const createSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Image must be a valid URL'),
  categoryId: z.string().cuid('Category ID must be a valid UUID'),
  price: z.number().min(0, 'Price must be greater than 0'),
})
export type CreateInput = z.infer<typeof createSchema>

export const updateSchema = getOneSchema.merge(createSchema)
export type UpdateInput = z.infer<typeof updateSchema>
