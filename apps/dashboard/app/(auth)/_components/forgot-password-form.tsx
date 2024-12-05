'use client'

import type { ForgotPassword } from '@yuki/api/types/user'
import { Button } from '@yuki/ui/button'
import { CardContent, CardFooter } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/hooks/use-toast'

import { api } from '@/lib/trpc/react'

export const ForgotPasswordForm: React.FC = () => {
  const forgotPassword = api.user.forgotPassword.useMutation({
    onError: (e) => !e.data?.zodError && toast({ type: 'destructive', title: e.message }),
    onSuccess: async () => {
      toast({ title: 'Reset email sent' })
      await new Promise((resolve) => setTimeout(resolve, 100))
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget)) as ForgotPassword
        forgotPassword.mutate(data)
        e.currentTarget.reset()
      }}
    >
      <CardContent className="space-y-4">
        <FormField
          name="email"
          type="email"
          placeholder="yuki@example.com"
          disabled={forgotPassword.isPending}
          message={forgotPassword.error?.data?.zodError?.email?.at(0)}
        />
      </CardContent>

      <CardFooter className="*:w-full">
        <Button type="submit" disabled={forgotPassword.isPending}>
          Send password reset email
        </Button>
      </CardFooter>
    </form>
  )
}
