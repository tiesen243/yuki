'use client'

import { useMutation } from '@tanstack/react-query'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@yuki/ui/form'
import { toast } from '@yuki/ui/sonner'

import { useTRPC } from '@/lib/trpc/react'

export const ForgotPasswordForm = () => {
  const trpc = useTRPC()

  const { mutate, isPending, error } = useMutation(
    trpc.auth.forgotPassword.mutationOptions({
      onError: (error) => toast.error(error.message),
      onSuccess: () =>
        toast.success('Password reset email sent! Please check your inbox'),
    }),
  )

  return (
    <CardContent className="space-y-4">
      <Form<typeof mutate>
        onSubmit={mutate}
        isPending={isPending}
        errors={error?.data?.zodError}
      >
        <FormField
          name="email"
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
