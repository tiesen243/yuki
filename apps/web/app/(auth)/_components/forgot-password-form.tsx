'use client'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@yuki/ui/form'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export const ForgotPasswordForm = () => {
  const { mutate, isPending, error } = api.auth.forgotPassword.useMutation({
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success('Password reset email sent! Please check your inbox'),
  })

  return (
    <CardContent className="space-y-4">
      <Form<typeof mutate> onSubmit={mutate} isPending={isPending}>
        <FormField
          name="email"
          error={error?.data?.zodError?.email?.at(0)}
          render={() => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl type="email" placeholder="yuki@example.com" />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isPending}>
          Send reset link
        </Button>
      </Form>
    </CardContent>
  )
}
