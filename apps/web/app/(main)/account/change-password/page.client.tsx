'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@yuki/ui/form'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export const ChangePasswordForm = () => {
  const router = useRouter()
  const { mutate, isPending, error } = api.auth.changePassword.useMutation({
    onError: (data) => toast.error(data.message),
    onSuccess: () => {
      router.push('/sign-in')
      toast.success('Password changed successfully')
    },
  })

  return (
    <Form<typeof mutate>
      className="container mt-4"
      onSubmit={mutate}
      isPending={isPending}
    >
      <FormField
        name="currentPassword"
        error={error?.data?.zodError?.currentPassword?.at(0)}
        render={() => (
          <FormItem>
            <FormLabel>Current Password</FormLabel>
            <FormControl type="password" />
            <FormMessage />
            <FormDescription>
              Keep it empty if you don&apos;t have a password yet.
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        name="newPassword"
        error={error?.data?.zodError?.newPassword?.at(0)}
        render={() => (
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl type="password" />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="confirmNewPassword"
        error={error?.data?.zodError?.confirmNewPassword?.at(0)}
        render={() => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl type="password" />
            <FormMessage />
          </FormItem>
        )}
      />

      <Button className="w-full" disabled={isPending}>
        Change Password
      </Button>
    </Form>
  )
}
