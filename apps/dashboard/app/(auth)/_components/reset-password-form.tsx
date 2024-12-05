'use client'

import { useRouter } from 'next/navigation'

import type { ResetPassword } from '@yuki/api/types/user'
import { Button } from '@yuki/ui/button'
import { CardContent, CardFooter } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/hooks/use-toast'

import { api } from '@/lib/trpc/react'

export const ResetPasswordForm: React.FC<{ token: string; email: string }> = (props) => {
  const router = useRouter()
  const resetPassword = api.user.resetPassword.useMutation({
    onError: (e) => !e.data?.zodError && toast({ type: 'destructive', title: e.message }),
    onSuccess: async () => {
      toast({
        title: 'Reset password successfully',
        description: 'You will be navigate to sign in',
      })
      await new Promise((resolve) => setTimeout(resolve, 100))
      router.push('/sign-in')
    },
  })

  console.log(props)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget)) as ResetPassword
        resetPassword.mutate({ ...data, ...props })
        e.currentTarget.reset()
      }}
    >
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            disabled={resetPassword.isPending}
            message={resetPassword.error?.data?.zodError?.[field.name]?.at(0)}
          />
        ))}
      </CardContent>

      <CardFooter className="*:w-full">
        <Button type="submit" disabled={resetPassword.isPending}>
          Reset password
        </Button>
      </CardFooter>
    </form>
  )
}

const fields = [
  { name: 'password', label: 'Password', type: 'password', placeholder: '********' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '********' },
]
