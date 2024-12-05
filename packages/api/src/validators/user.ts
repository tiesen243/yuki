import { z } from 'zod'

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number and special character',
  )

export const signUp = z
  .object({
    name: z.string().min(4),
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
export type SignUp = z.infer<typeof signUp>

export const signIn = z.object({
  email: z.string().email(),
  password: passwordSchema,
})
export type SignIn = z.infer<typeof signIn>

export const changePassword = z
  .object({
    oldPassword: passwordSchema.optional(),
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Passwords do not match',
  })
export type ChangePassword = z.infer<typeof changePassword>

export const forgotPassword = z.object({
  email: z.string().email(),
})
export type ForgotPassword = z.infer<typeof forgotPassword>

export const resetPassword = z
  .object({
    email: z.string().email(),
    token: z.string(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
export type ResetPassword = z.infer<typeof resetPassword>
