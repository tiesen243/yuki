import * as z from 'zod/v4'

export const byIdSchema = z.object({
  id: z.cuid2(),
})

export const addSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  line1: z.string().min(1, 'Address line 1 is required'),
  line2: z.string().nullable(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  isDefault: z.boolean().default(false),
})

export const updateSchema = z.object({
  ...byIdSchema.shape,
  ...addSchema.shape,
})
