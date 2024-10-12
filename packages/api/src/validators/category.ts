import { z } from 'zod'

import { getOne, query } from './utils'

export const categorySchema = {
  query,
  getOne,

  create: z.object({
    name: z.string().min(1, 'Name is required'),
    image: z.string().optional(),
  }),

  update: z.object({
    id: z.string(),
    name: z.string().min(1, 'Name is required'),
    image: z.string().optional(),
  }),
}
