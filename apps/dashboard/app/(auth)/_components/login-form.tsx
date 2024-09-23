'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export interface Props {
  searchParams: { redirect?: string }
  setCookies?: (cookie: { name: string; value: string; attributes: object }) => Promise<void>
}

export const LoginForm: React.FC<Props> = ({ searchParams, setCookies }) => {
  const router = useRouter()

  const { mutate, isPending, error } = api.auth.signIn.useMutation({
    onSuccess: async (sessionCookie) => {
      toast.success('Logged in successfully')
      await setCookies?.(sessionCookie)
      router.push(searchParams.redirect ?? '/')
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
        <fieldset className="space-y-2" disabled={isPending}>
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" placeholder="yuki@example.com" />
          <small className="text-xs text-destructive">{error?.data?.zodError?.email}</small>
        </fieldset>

        <fieldset className="space-y-2" disabled={isPending}>
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              onClick={() => router.push('/forgot-password')}
              className="ml-auto inline-block text-xs underline"
            >
              Forgot your password?
            </button>
          </div>
          <Input name="password" type="password" placeholder="Password" />
          <small className="text-xs text-destructive">{error?.data?.zodError?.password}</small>
        </fieldset>

        <Button className="w-full" disabled={isPending}>
          Login
        </Button>

        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <button type="button" onClick={() => router.push('/sign-up')} className="underline">
            Sign up
          </button>
        </div>
      </form>
    </CardContent>
  )
}
