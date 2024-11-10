import { z } from 'zod'

export const createPost = z.object({ content: z.string().min(1) })
export type CreatePost = z.infer<typeof createPost>
