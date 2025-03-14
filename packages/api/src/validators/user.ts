import { z } from 'zod'

export const query = z.object({
  query: z.string().optional(),
  page: z.number().default(1),
  limit: z.number().default(8),
})
export type Query = z.infer<typeof query>

export const getOneSchema = z.object({ id: z.string() })
export type GetOneInput = z.infer<typeof getOneSchema>

export const updateProfileSchema = z.object({
  name: z.string().min(1),
  image: z.string().url(),
})
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

export const unlinkAccountSchema = z.object({ provider: z.string() })
export type UnlinkAccountInput = z.infer<typeof unlinkAccountSchema>

export const newAddressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  state: z.string().min(1, 'State is required'),
  street: z.string().min(1, 'Street is required'),
})
export type NewAddressInput = z.infer<typeof newAddressSchema>

export const updateAddressSchema = getOneSchema.merge(newAddressSchema)
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>
