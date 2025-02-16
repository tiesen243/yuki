'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { toast } from '@yuki/ui/sonner'

import { FormField } from '@/app/_components/form-field'
import { api } from '@/lib/trpc/react'

export const SignUpForm = () => {
  const router = useRouter()
  const { mutate, isPending, error } = api.auth.signUp.useMutation({
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Account created successfully')
      router.push('/sign-in')
    },
  })

  return (
    <form
      action={(formData) => {
        mutate({
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          confirmPassword: formData.get('confirmPassword') as string,
        })
      }}
    >
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <FormField
            {...field}
            key={field.name}
            error={error?.data?.zodError?.[field.name]?.at(0)}
          />
        ))}

        <Button type="submit" className="w-full" disabled={isPending}>
          Register
        </Button>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <a
            className="cursor-pointer underline-offset-4 hover:underline"
            onClick={() => {
              router.push('/sign-in')
            }}
          >
            Sign In
          </a>
        </div>
      </CardContent>
    </form>
  )
}

const fields = [
  { name: 'name', label: 'Name', placeholder: 'Yuki', type: 'text' },
  { name: 'email', label: 'Email', placeholder: 'yuki@example.com', type: 'email' },
  { name: 'password', label: 'password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
]
