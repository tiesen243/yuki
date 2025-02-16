'use client'

import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export const SignInForm: React.FC<{
  setToken: (token: string, expiresAt: Date) => Promise<void>
}> = ({ setToken }) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = api.auth.signIn.useMutation({
    onError: (error) => toast.error(error.message),
    onSuccess: async (data) => {
      await setToken(data.token, data.expiresAt)
      await queryClient.invalidateQueries({ queryKey: ['auth'] })
      router.push('/')
      router.refresh()
      toast.success('Logged in successfully')
    },
  })

  return (
    <form
      action={(formData) => {
        mutate({
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        })
      }}
    >
      <CardContent className="space-y-4">
        <fieldset className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="yuki@example.com"
            aria-invalid={error?.data?.zodError?.email?.at(0) ? 'true' : 'false'}
          />
          <span className="text-destructive text-xs">
            {error?.data?.zodError?.email?.at(0)}
          </span>
        </fieldset>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a
              className="text-sm underline-offset-2 hover:underline"
              onClick={() => {
                router.push('/forgot-password')
              }}
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            aria-invalid={error?.data?.zodError?.password?.at(0) ? 'true' : 'false'}
          />
          <span className="text-destructive text-xs">
            {error?.data?.zodError?.password?.at(0)}
          </span>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          Login
        </Button>

        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <a
            className="cursor-pointer underline-offset-4 hover:underline"
            onClick={() => {
              router.push('/sign-up')
            }}
          >
            Sign up
          </a>
        </div>
      </CardContent>
    </form>
  )
}
