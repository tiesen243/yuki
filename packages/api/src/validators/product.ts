import { z } from 'zod'

import { getOne, query } from './utils'

export const productSchema = {
  query,
  getOne,

  create: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    category: z.string().min(1, 'Category is required'),
    image: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().int().positive(),
  }),

  update: z.object({
    id: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().positive().optional(),
  }),

  comment: z.object({
    productId: z.string(),
    content: z.string().min(1, 'Comment is required'),
    stars: z
      .number()
      .int()
      .min(1, 'Stars is required')
      .max(5, 'Stars must be between 1 and 5')
      .default(1),
  }),
}
