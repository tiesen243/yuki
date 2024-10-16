import { z } from 'zod'

import { passwordSchema } from './utils'

export const authSchema = {
  signIn: z.object({
    email: z.string().email('Invalid email'),
    password: passwordSchema,
  }),

  signUp: z
    .object({
      name: z.string().min(4, 'Name must be at least 4 characters'),
      email: z.string().email('Invalid email'),
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),

  changePassword: z
    .object({
      currentPassword: passwordSchema.optional(),
      newPassword: passwordSchema,
      confirmPassword: passwordSchema,
      isLogoutAll: z.boolean().default(false),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),

  forgotPassword: z.object({
    email: z.string().email(),
  }),

  resetPassword: z
    .object({
      token: z.string(),
      email: z.string().email(),
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
  deleteAccount: z.object({
    confirm: z.string().refine((data) => data === 'Delete my account', {
      message: 'Please type "Delete my account"',
    }),
    password: passwordSchema,
  }),
}
