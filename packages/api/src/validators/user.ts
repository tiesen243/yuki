import { z } from 'zod'

import { getOne, passwordSchema, query } from './utils'

export const userSchema = {
  query,
  getOne,

  updateRole: z.object({
    id: z.string(),
    role: z.enum(['USER', 'ADMIN']).optional(),
  }),

  updateProfile: z.object({
    name: z.string().min(4, 'Name must be at least 4 characters'),
    avatar: z.string().url(),
    address: z.string().min(4, 'Address must be at least 4 characters'),
    city: z.string().min(4, 'City must be at least 4 characters'),
    state: z.string().min(4, 'State must be at least 4 characters'),
    zipCode: z.number().min(6, 'Zip code must be at least 6 characters'),
    country: z.string().min(1, 'Country is required'),
  }),

  deleteProfile: z.object({
    password: passwordSchema,
    confirm: z.string().refine((data) => data === 'Delete my account', {
      message: 'Please type "Delete my account" to confirm',
    }),
  }),
}
