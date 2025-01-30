import { z } from 'zod'

export const query = z.object({
  query: z.string().optional(),
  page: z.number().default(1),
  limit: z.number().default(12),
})
export type Query = z.infer<typeof query>
