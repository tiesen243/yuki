import { z } from 'zod'

export const query = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  noLimit: z.boolean().default(false),
})
export type Query = z.infer<typeof query>

export const getOne = z.object({
  id: z.string(),
})
