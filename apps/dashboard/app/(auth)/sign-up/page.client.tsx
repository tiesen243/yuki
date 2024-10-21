'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'

import { api } from '@/lib/trpc/react'

export const PageClient: React.FC = () => {
  const router = useRouter()
  const signUp = api.auth.signUp.useMutation({
    onSuccess: () => router.push('/'),
  })

  return (
    <form
      className="space-y-4"
      action={(formData: FormData) => signUp.mutate(Object.fromEntries(formData) as Field)}
    >
      {fields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          disabled={signUp.isPending}
          message={signUp.error?.data?.zodError?.[field.name]}
        />
      ))}

      <Button className="w-full" disabled={signUp.isPending}>
        Register
      </Button>

      <div className="flex flex-col justify-between md:flex-row">
        <p>
          Already have an account?{' '}
          <span className="cursor-pointer hover:underline" onClick={() => router.push('/sign-in')}>
            Login
          </span>
        </p>

        <p>
          Forgot your password?{' '}
          <span
            className="cursor-pointer hover:underline"
            onClick={() => router.push('/forgot-password')}
          >
            Reset Password
          </span>
        </p>
      </div>
    </form>
  )
}

const fields = [
  { name: 'name' as const, label: 'Name', type: 'text' },
  { name: 'email' as const, label: 'Email', type: 'email' },
  { name: 'password' as const, label: 'Password', type: 'password' },
  { name: 'confirmPassword' as const, label: 'Confirm Password', type: 'password' },
]
type Field = { name: string; email: string; password: string; confirmPassword: string }
