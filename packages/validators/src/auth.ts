import { z } from 'zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().regex(passwordRegex, {
    message: 'Invalid password',
  }),
})

export const signUpSchema = z
  .object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().regex(passwordRegex, {
      message: 'Invalid password',
    }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .regex(passwordRegex, { message: 'Invalid password' })
      .optional(),
    newPassword: z
      .string()
      .regex(passwordRegex, { message: 'Invalid password' }),
    confirmPassword: z
      .string()
      .regex(passwordRegex, { message: 'Invalid password' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
