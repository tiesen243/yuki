'use client'

import { useRouter } from 'next/navigation'

import type { RouterInputs } from '@yuki/api/root'
import { Button } from '@yuki/ui/button'
import { Checkbox } from '@yuki/ui/checkbox'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'

import { api } from '@/lib/tprc/react'

export const ChangePasswordForm: React.FC = () => {
  const router = useRouter()
  const { mutate, isPending, error } = api.user.changePassword.useMutation({
    onSuccess: () => router.refresh(),
  })

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        mutate(Object.fromEntries(formData) as RouterInputs['user']['changePassword'])
        e.currentTarget.reset()
      }}
    >
      {fields.map((field) => (
        <div
          key={field.name}
          className={`flex gap-2 ${field.type === 'checkbox' ? 'flex-row' : 'flex-col'}`}
        >
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === 'checkbox' ? <Checkbox name={field.name} /> : <Input {...field} />}
          {field.message && <p className="text-sm text-muted-foreground">{field.message}</p>}
          {error?.data?.zodError?.[field.name] && (
            <p className="text-sm text-destructive">{error.data.zodError[field.name]}</p>
          )}
        </div>
      ))}

      <Button className="w-full" disabled={isPending}>
        Change Password
      </Button>
    </form>
  )
}

const fields = [
  {
    name: 'currentPassword',
    label: 'Current Password',
    type: 'password',
    placeholder: 'Enter your current password',
    message: 'If you do not have a password, leave this field empty',
  },
  {
    name: 'newPassword',
    label: 'New Password',
    type: 'password',
    placeholder: 'Enter your new password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your new password',
  },
  {
    name: 'isSignOutAll',
    label: 'Sign out from all devices',
    type: 'checkbox',
  },
]
