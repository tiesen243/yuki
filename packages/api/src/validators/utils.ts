import { z } from 'zod'

export const query = z.object({
  q: z
    .string()
    .trim()
    .transform((v) => (v === '' || v === ' ' ? undefined : v))
    .optional(),
  category: z
    .string()
    .trim()
    .transform((v) => (v === '' || v === ' ' ? undefined : v))
    .optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  sort: z
    .enum(['price-asc', 'price-desc', 'createdAt-asc', 'createdAt-desc'])
    .default('createdAt-desc'),
})
export type Query = z.infer<typeof query>

export const getOne = z.object({
  id: z.string(),
})

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number and special character',
  )
