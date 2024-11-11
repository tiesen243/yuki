'use client'

import { useRouter } from 'next/navigation'

import type { RouterInputs } from '@yuki/api/root'
import { signIn } from '@yuki/auth'
import { Button } from '@yuki/ui/button'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/tprc/react'

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const { mutate, isPending, error } = api.user.login.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: async ({ user }) => {
      toast.success('Logged in successfully')
      await signIn(user.id)
      router.push('/')
    },
  })

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        mutate(Object.fromEntries(formData) as RouterInputs['user']['login'])
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" placeholder="yuki@example.com" disabled={isPending} />
        {error?.data?.zodError?.email && (
          <p className="text-sm text-destructive">{error.data.zodError.email}</p>
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <button
            type="button"
            onClick={() => router.push('/forgot-password')}
            className="ml-auto inline-block text-sm hover:underline"
          >
            Forgot your password?
          </button>
        </div>
        <Input name="password" type="password" placeholder="••••••••" disabled={isPending} />
        {error?.data?.zodError?.password && (
          <p className="text-sm text-destructive">{error.data.zodError.password}</p>
        )}
      </div>

      <Button className="w-full" disabled={isPending}>
        Login
      </Button>
    </form>
  )
}
