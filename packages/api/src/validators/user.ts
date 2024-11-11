import { z } from 'zod'

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number and special character',
  )

export const userSchema = {
  login: z.object({
    email: z.string().email(),
    password: passwordSchema,
  }),
  register: z
    .object({
      name: z.string().min(4, 'Name must be at least 4 characters long'),
      email: z.string().email(),
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    }),
  changePassword: z
    .object({
      oldPassword: passwordSchema.optional(),
      newPassword: passwordSchema,
      confirmPassword: passwordSchema,
      isSignOutAll: z.enum(['on']).optional(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      path: ['confirmNewPassword'],
      message: 'Passwords do not match',
    }),
}
