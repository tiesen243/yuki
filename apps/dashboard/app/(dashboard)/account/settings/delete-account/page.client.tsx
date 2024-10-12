'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/sonner'

import { signOut } from '@/lib/actions'
import { api } from '@/lib/trpc/react'

export const PageClient: React.FC = () => {
  const router = useRouter()
  const { mutate, isPending, error } = api.user.deleteProfile.useMutation({
    onSuccess: async () => {
      toast.success('Profile deleted')
      await signOut()
    },
    onError: (e) => !e.data?.zodError && toast.error(e.message),
  })

  const action = async (formData: FormData) => {
    mutate({
      password: String(formData.get('password')),
      confirm: String(formData.get('confirm')),
    })
  }
  return (
    <form action={action} className="mt-4 space-y-4">
      {fields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          message={error?.data?.zodError?.[field.name]?.at(0)}
          disabled={isPending}
        />
      ))}

      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button variant="destructive" disabled={isPending}>
          Delete account
        </Button>
      </div>
    </form>
  )
}

const fields = [
  {
    name: 'password' as const,
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
  {
    name: 'confirm' as const,
    label: 'Type "Delete my account" to confirm',
    type: 'text',
    placeholder: 'Delete my account',
  },
]
