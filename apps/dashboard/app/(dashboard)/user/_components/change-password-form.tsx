'use client'

import { ChangePassword } from '@yuki/api/types/user'
import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/hooks/use-toast'

import { api } from '@/lib/trpc/react'

export const ChangePasswordForm: React.FC<{ hasPassword: boolean }> = ({ hasPassword }) => {
  const changePassword = api.user.changePassword.useMutation({
    onError: (e) => !e.data?.zodError && toast({ title: e.message, variant: 'destructive' }),
    onSuccess: () => toast({ title: 'Password changed successfully' }),
  })

  const errors = changePassword.error?.data?.zodError

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        changePassword.mutate(Object.fromEntries(new FormData(e.currentTarget)) as ChangePassword)
      }}
    >
      {hasPassword && (
        <FormField
          label="Old Password"
          type="password"
          name="oldPassword"
          disabled={changePassword.isPending}
          message={errors?.oldPassword?.at(0)}
        />
      )}
      <FormField
        label="New Password"
        type="password"
        name="newPassword"
        disabled={changePassword.isPending}
        message={errors?.newPassword?.at(0)}
      />
      <FormField
        label="Confirm New Password"
        type="password"
        name="confirmNewPassword"
        disabled={changePassword.isPending}
        message={errors?.confirmNewPassword?.at(0)}
      />
      <Button disabled={changePassword.isPending}>
        {changePassword.isPending ? 'Changing Password...' : 'Change Password'}
      </Button>
    </form>
  )
}
