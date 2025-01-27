import { z } from 'zod'

const byId = z.object({ id: z.string() })
export type PostById = z.infer<typeof byId>

const create = z.object({ title: z.string().min(1), content: z.string().min(1) })
export type CreatePost = z.infer<typeof create>

export const postSchema = {
  byId,
  create,
}
