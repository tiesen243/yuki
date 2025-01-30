import { z } from 'zod'

export const query = z.object({
  page: z.number().default(1),
  limit: z.number().default(8),
})
export type Query = z.infer<typeof query>
