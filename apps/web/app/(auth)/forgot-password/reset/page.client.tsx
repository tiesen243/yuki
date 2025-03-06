'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@yuki/ui/form'
import { toast } from '@yuki/ui/sonner'

import { useTRPC } from '@/lib/trpc/react'

export const ResetPasswordForm: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter()
  const trpc = useTRPC()

  const { mutate, isPending, error } = useMutation(
    trpc.auth.resetPassword.mutationOptions({
      onError: (error) => toast.error(error.message),
      onSuccess: () => {
        toast.success('Password has been reset successfully')
        router.push('/sign-in')
      },
    }),
  )

  return (
    <CardContent className="space-y-4">
      <Form<typeof mutate>
        defaultValues={{ token, password: '', confirmPassword: '' }}
        onSubmit={mutate}
        isPending={isPending}
        errors={error?.data?.zodError}
      >
        <FormField
          name="password"
          render={(field) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl {...field} type="password" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          render={(field) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl {...field} type="password" />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isPending}>
          Reset password
        </Button>
      </Form>
    </CardContent>
  )
}
