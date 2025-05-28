import { z } from 'zod/v4'

export const byIdSchema = z.object({
  id: z.uuid(),
})

export const addSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  phone: z.string().min(1).max(50),
  address: z.string().min(1).max(255),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  zipCode: z.string().min(1).max(20),
})
