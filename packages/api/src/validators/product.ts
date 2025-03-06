import { z } from 'zod'

export const query = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  sortBy: z.enum(['createdAt', 'name', 'price']).default('createdAt'),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
  page: z.number().default(1),
  limit: z.number().default(12),
})
export type Query = z.infer<typeof query>

export const getOneSchema = z.object({ id: z.string() })
export type GetOneInput = z.infer<typeof getOneSchema>

export const getReviewsSchema = z.object({
  productId: z.string(),
  page: z.number().default(1),
  limit: z.number().default(5),
})
export type GetReviewsInput = z.infer<typeof getReviewsSchema>

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Image must be a valid URL'),
  categoryId: z.string().cuid('Category ID must be a valid UUID'),
  price: z.number().min(0, 'Price must be greater than 0'),
})
export type CreateProductInput = z.infer<typeof createProductSchema>

export const updateProductSchema = getOneSchema.merge(createProductSchema)
export type UpdateProductInput = z.infer<typeof updateProductSchema>
