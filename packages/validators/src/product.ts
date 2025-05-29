import * as z from 'zod/v4'

export const allSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export const byIdSchema = z.object({
  id: z.uuid(),
})
