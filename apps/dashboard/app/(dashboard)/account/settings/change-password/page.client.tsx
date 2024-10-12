'use client'

import { useRouter } from 'next/navigation'

import { useSession } from '@yuki/auth/react'
import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/sonner'
import { Switch } from '@yuki/ui/switch'

import { api } from '@/lib/trpc/react'

export const ChangePasswordForm: React.FC = () => {
  const session = useSession()
  const router = useRouter()

  const { mutate, isPending, error } = api.auth.changePassword.useMutation({
    onSuccess: () => {
      toast.success('Password changed successfully')
      router.refresh()
    },
    onError: (e) => !e.data?.zodError && toast.error(e.message),
  })

  const action = async (formData: FormData) => {
    mutate({
      currentPassword: String(formData.get('currentPassword')),
      newPassword: String(formData.get('newPassword')),
      confirmPassword: String(formData.get('confirmPassword')),
      isLogoutAll: Boolean(formData.get('isLogoutAll')),
    })
  }

  if (!session) return null
  return (
    <form action={action} className="space-y-4">
      {session.user.password && (
        <FormField
          label="Current password"
          type="password"
          name="currentPassword"
          placeholder="Enter your current password"
          message={error?.data?.zodError?.currentPassword?.at(0)}
          disabled={isPending}
        />
      )}

      <FormField
        label="New password"
        type="password"
        name="newPassword"
        placeholder="Enter your new password"
        message={error?.data?.zodError?.newPassword?.at(0)}
        disabled={isPending}
      />

      <FormField
        label="Confirm password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your new password"
        message={error?.data?.zodError?.confirmPassword?.at(0)}
        disabled={isPending}
      />

      <FormField
        label="Logout from all devices"
        type="checkbox"
        name="isLogoutAll"
        className="flex items-center justify-between"
        disabled={isPending}
        asChild
      >
        <Switch id="isLogoutAll" type="button" />
      </FormField>

      <Button className="w-full" disabled={isPending}>
        Change password
      </Button>
    </form>
  )
}
