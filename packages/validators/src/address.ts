import * as z from 'zod/v4'

export const byIdSchema = z.object({
  id: z.uuid(),
})

export const addSchema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().min(1).max(20),
  address: z.string().min(1).max(255),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  postalCode: z.string().min(1).max(20),
  country: z.string().min(1).max(100),
})

export const updateSchema = z.object({
  ...byIdSchema.shape,
  ...addSchema.shape,
})
