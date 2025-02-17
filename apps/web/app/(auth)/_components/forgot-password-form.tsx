'use client'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { toast } from '@yuki/ui/sonner'

import { FormField } from '@/app/_components/form-field'
import { api } from '@/lib/trpc/react'

export const ForgotPasswordForm = () => {
  const { mutate, isPending, error } = api.auth.forgotPassword.useMutation({
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success('Password reset email sent! Please check your inbox'),
  })

  return (
    <form
      action={(formData) => {
        mutate({ email: formData.get('email') as string })
      }}
    >
      <CardContent className="space-y-4">
        <FormField
          name="email"
          type="email"
          placeholder="yuki@example.com"
          error={error?.data?.zodError?.email?.at(0)}
        />

        <Button className="w-full" disabled={isPending}>
          Send reset link
        </Button>
      </CardContent>
    </form>
  )
}
