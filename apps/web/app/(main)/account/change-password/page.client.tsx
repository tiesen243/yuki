'use client'

import Form from 'next/form'
import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { toast } from '@yuki/ui/hooks/use-toast'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'

import { api } from '@/lib/trpc/react'

export const ChangePasswordForm = () => {
  const router = useRouter()
  const { mutate, isPending, error } = api.auth.changePassword.useMutation({
    onSuccess() {
      router.push('/sign-in')
      toast({ variant: 'success', description: 'Password changed successfully' })
    },
    onError(data) {
      toast({ variant: 'error', description: data.message })
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
      <fieldset>
        <Label htmlFor="password">Current Password</Label>
        <Input
          type="password"
          name="password"
          className="bg-background"
          placeholder="Current Password"
        />
        {error?.data?.zodError?.currentPassword?.at(0) ? (
          <span className="text-destructive text-xs">
            {error.data.zodError.currentPassword.at(0)}
          </span>
        ) : (
          <span className="text-xs">
            Keep it empty if you don&apos;t have a password yet.
          </span>
        )}
      </fieldset>

      <fieldset>
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          type="password"
          name="newPassword"
          className="bg-background"
          placeholder="New Password"
        />
        {error?.data?.zodError?.newPassword?.at(0) && (
          <span className="text-destructive text-xs">
            {error.data.zodError.newPassword.at(0)}
          </span>
        )}
      </fieldset>

      <fieldset>
        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
        <Input
          type="password"
          name="confirmNewPassword"
          className="bg-background"
          placeholder="Confirm New Password"
        />
        {error?.data?.zodError?.confirmNewPassword?.at(0) && (
          <span className="text-destructive text-xs">
            {error.data.zodError.confirmNewPassword.at(0)}
          </span>
        )}
      </fieldset>

      <Button className="w-full" disabled={isPending}>
        Change Password
      </Button>
    </Form>
  )
}
