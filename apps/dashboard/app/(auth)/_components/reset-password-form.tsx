'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { CardContent, CardFooter } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export interface Props {
  searchParams: {
    token: string
    email: string
  }
}

export const ResetPasswordForm: React.FC<Props['searchParams']> = ({ email, token }) => {
  const router = useRouter()
  const { mutate, isPending, error } = api.auth.resetPassword.useMutation({
    onSuccess: () => {
      toast.success('Password reset successfully')
      router.push('/sign-in')
    },
    onError: (e) => !e.data?.zodError && toast.error(e.message),
  })

  const action = async (formData: FormData) => {
    const password = String(formData.get('password'))
    const confirmPassword = String(formData.get('confirmPassword'))
    mutate({ email, token, password, confirmPassword })
  }

  return (
    <form action={action}>
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            message={error?.data?.zodError?.[field.name]?.at(0)}
            disabled={isPending}
          />
        ))}
      </CardContent>

      <CardFooter className="justify-end gap-4">
        <Button disabled={isPending}>Reset Password</Button>
        <Button
          type="button"
          variant="secondary"
          disabled={isPending}
          onClick={() => router.push('/sign-in')}
        >
          Cancel
        </Button>
      </CardFooter>
    </form>
  )
}

const fields = [
  {
    name: 'password',
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
]
