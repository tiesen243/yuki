'use client'

import Form from 'next/form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { toast } from '@yuki/ui/hooks/use-toast'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'

import { api } from '@/lib/trpc/react'

export const SignInForm: React.FC<{
  setToken: (token: string, expiresAt: Date) => Promise<void>
}> = ({ setToken }) => {
  const router = useRouter()
  const utils = api.useUtils()
  const { mutate, isPending, error } = api.auth.signIn.useMutation({
    onError: (error) => toast({ description: error.message, variant: 'error' }),
    onSuccess: async (data) => {
      await setToken(data.token, data.expiresAt)
      await utils.auth.getSession.invalidate()
      router.refresh()
      router.push('/')
      toast({ description: 'Logged in successfully', variant: 'success' })
    },
  })

  return (
    <Form
      action={(formData) => {
        mutate({
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        })
      }}
    >
      <CardContent className="space-y-4">
        <fieldset className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="Email" />
          <span className="text-destructive text-xs">
            {error?.data?.zodError?.email?.at(0)}
          </span>
        </fieldset>

        <fieldset className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input name="password" placeholder="Password" type="password" />
          <span className="text-destructive text-xs">
            {error?.data?.zodError?.password?.at(0)}
          </span>
        </fieldset>

        <p className="text-xs">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="hover:underline">
            Register now
          </Link>
        </p>
        <Button type="submit" className="w-full" disabled={isPending}>
          Login
        </Button>
      </CardContent>
    </Form>
  )
}
