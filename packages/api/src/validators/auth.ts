import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'Password must contain at least 8 characters')
  .max(100, 'Password must contain at most 100 characters')
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
  )

export const signIn = z.object({
  email: z.string().email(),
  password: passwordSchema,
})
export type SignIn = z.infer<typeof signIn>

export const signUp = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
export type SignUp = z.infer<typeof signUp>

export const changePassword = z
  .object({
    currentPassword: passwordSchema.optional(),
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })
export type ChangePassword = z.infer<typeof changePassword>

export const forgotPassword = z.object({
  email: z.string().email(),
})
export type ForgotPassword = z.infer<typeof forgotPassword>
