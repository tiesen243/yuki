'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export const RegisterForm: React.FC = () => {
  const router = useRouter()

  const { mutate, isPending, error } = api.auth.signUp.useMutation({
    onSuccess: () => {
      toast.success('Account created successfully')
      router.back()
    },
    onError: (e) => !e.data?.zodError && toast.error(e.message),
  })

  const action = (formData: FormData) => {
    // @ts-expect-error zod types are not inferred
    mutate(Object.fromEntries(formData))
  }

  return (
    <CardContent asChild>
      <form className="space-y-4" action={action}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            disabled={isPending}
            message={error?.data?.zodError?.[field.name]?.at(0)}
          />
        ))}

        <Button className="w-full" disabled={isPending}>
          Register
        </Button>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <button type="button" onClick={() => router.push('sign-in')} className="underline">
            Sign in
          </button>
        </div>
      </form>
    </CardContent>
  )
}

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Yuki' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'yuki@example.com' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Password' },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm Password',
  },
]
