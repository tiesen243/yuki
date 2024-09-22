import { z } from 'zod'

import { getOne, query } from './utils'

export const productSchema = {
  query,
  getOne,

  create: z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    image: z.string().url().optional(),
    price: z.number().positive(),
    stock: z.number().int().positive(),
  }),

  update: z.object({
    id: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    image: z.string().url().optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().positive().optional(),
  }),
}
