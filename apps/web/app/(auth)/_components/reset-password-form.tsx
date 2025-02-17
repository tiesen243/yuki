'use client'

import { useRouter } from 'next/navigation'

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
    <CardContent className="space-y-4">
      <Form<typeof mutate> isPending={isPending} onSubmit={mutate}>
        <FormField
          name="password"
          error={error?.data?.zodError?.password?.at(0)}
          render={() => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl type="password" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          error={error?.data?.zodError?.confirmPassword?.at(0)}
          render={() => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl type="password" />
              <FormMessage />
            </FormItem>
          )}
        />

        <input name="token" defaultValue={token} hidden />

        <Button className="w-full" disabled={isPending}>
          Reset password
        </Button>
      </Form>
    </CardContent>
  )
}
