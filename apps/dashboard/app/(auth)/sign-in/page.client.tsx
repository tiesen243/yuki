'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'

import { setCookie } from '@/lib/actions'
import { api } from '@/lib/trpc/react'

export const PageClient: React.FC<{ redirect?: string }> = ({ redirect }) => {
  const router = useRouter()

  const signIn = api.auth.signIn.useMutation({
    onSuccess: async (data) => {
      await setCookie(data)
      router.push(redirect ?? '/')
    },
  })

  return (
    <form
      className="space-y-4"
      action={(formData: FormData) => signIn.mutate(Object.fromEntries(formData) as Field)}
    >
      {fields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          disabled={signIn.isPending}
          message={signIn.error?.data?.zodError?.[field.name]}
        />
      ))}

      <Button className="w-full" disabled={signIn.isPending}>
        Login
      </Button>

      <div className="flex flex-col justify-between md:flex-row">
        <p>
          Don't have an account?{' '}
          <span className="cursor-pointer hover:underline" onClick={() => router.push('/sign-up')}>
            Register
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
  { name: 'email' as const, label: 'Email', type: 'email' },
  { name: 'password' as const, label: 'Password', type: 'password' },
]
type Field = { email: string; password: string }
