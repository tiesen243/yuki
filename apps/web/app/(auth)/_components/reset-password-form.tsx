'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { toast } from '@yuki/ui/sonner'

import { FormField } from '@/app/_components/form-field'
import { api } from '@/lib/trpc/react'

export const ResetPasswordForm: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter()
  const { mutate, isPending, error } = api.auth.resetPassword.useMutation({
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Password has been reset successfully')
      router.push('/sign-in')
    },
  })

  return (
    <form
      action={(formData) => {
        mutate({
          token,
          password: formData.get('password') as string,
          confirmPassword: formData.get('confirmPassword') as string,
        })
      }}
    >
      <CardContent className="space-y-4">
        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your new password"
          error={error?.data?.zodError?.password?.at(0)}
        />

        <FormField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your new password"
          error={error?.data?.zodError?.confirmPassword?.at(0)}
        />

        <Button className="w-full" disabled={isPending}>
          Reset password
        </Button>
      </CardContent>
    </form>
  )
}
