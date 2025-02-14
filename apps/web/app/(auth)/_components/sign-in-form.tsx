'use client'

import Form from 'next/form'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'
import { toast } from '@yuki/ui/toast'

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
    <Form
      action={(formData) => {
        mutate({
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        })
      }}
    >
      <CardContent className="space-y-2">
        <fieldset>
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
          <Button
            variant="link"
            size="sm"
            type="button"
            onClick={() => {
              router.push('/sign-up')
            }}
          >
            Register now
          </Button>
        </p>
        <Button type="submit" className="w-full" disabled={isPending}>
          Login
        </Button>
      </CardContent>
    </Form>
  )
}
