'use client'

import { useRouter } from 'next/navigation'

import type { SignIn } from '@yuki/api/types/user'
import { signIn } from '@yuki/auth'
import { Button } from '@yuki/ui/button'
import { CardContent, CardDescription, CardFooter } from '@yuki/ui/card'
import { toast } from '@yuki/ui/hooks/use-toast'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'

import { api } from '@/lib/trpc/react'

export const SignInForm: React.FC = () => {
  const router = useRouter()
  const { mutate, isPending, error } = api.user.signIn.useMutation({
    onError: (e) => !e.data?.zodError && toast({ type: 'destructive', title: e.message }),
    onSuccess: async (user) => {
      await signIn(user.id)
      toast({ title: 'Login successfully', description: 'You will be navigate to dashboard' })
      router.push('/')
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget)) as SignIn
        mutate(data)
        e.currentTarget.reset()
      }}
    >
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" placeholder="yuki@example.com" disabled={isPending} />
          {error?.data?.zodError?.email && (
            <p className="text-xs text-destructive">{error.data.zodError.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button type="button" variant="link" onClick={() => router.push('/forgot-password')}>
              Forgot your password?
            </Button>
          </div>
          <Input name="password" type="password" placeholder="********" disabled={isPending} />
          {error?.data?.zodError?.password && (
            <p className="text-xs text-destructive">{error.data.zodError.password}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-4 *:w-full">
        <Button type="submit" disabled={isPending}>
          Login
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/api/auth/discord')}
          disabled={isPending}
        >
          Login with Discord
        </Button>

        <CardDescription>
          Don&apos;t have an account?{' '}
          <Button
            type="button"
            variant="link"
            onClick={() => router.push('/sign-up')}
            disabled={isPending}
          >
            Sign up
          </Button>
        </CardDescription>
      </CardFooter>
    </form>
  )
}
