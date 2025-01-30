import { z } from 'zod'

export const getOneSchema = z.object({ id: z.string() })
export type GetOneInput = z.infer<typeof getOneSchema>

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
