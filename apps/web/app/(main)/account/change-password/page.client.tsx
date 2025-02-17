'use client'

import Form from 'next/form'
import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { toast } from '@yuki/ui/sonner'

import { FormField } from '@/app/_components/form-field'
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
    <Form
      className="container mt-4 space-y-2"
      action={(formData) => {
        mutate({
          currentPassword: formData.get('password') as string,
          newPassword: formData.get('newPassword') as string,
          confirmNewPassword: formData.get('confirmNewPassword') as string,
        })
      }}
    >
      <FormField
        name="currentPassword"
        label="Current Password"
        type="password"
        disabled={isPending}
        error={error?.data?.zodError?.currentPassword?.at(0)}
        message="Keep it empty if you don't have a password yet."
      />

      <FormField
        name="newPassword"
        label="New Password"
        type="password"
        disabled={isPending}
        error={error?.data?.zodError?.newPassword?.at(0)}
      />

      <FormField
        name="confirmNewPassword"
        label="Confirm Password"
        type="password"
        disabled={isPending}
        error={error?.data?.zodError?.confirmNewPassword?.at(0)}
      />

      <Button className="w-full" disabled={isPending}>
        Change Password
      </Button>
    </Form>
  )
}
