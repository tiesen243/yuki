import { z } from 'zod'

export const byIdSchema = z.object({
  id: z.uuid(),
})

export const createPostSchema = z.object({
  title: z.string().min(4),
  content: z.string().min(10),
})
