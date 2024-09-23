import { z } from 'zod'

import { getOne, query } from './utils'

export const userSchema = {
  query,
  getOne,

  update: z.object({
    id: z.string(),
    role: z.enum(['USER', 'ADMIN']).optional(),
  }),
}
