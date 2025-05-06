import { data, redirect, useSubmit } from 'react-router'

import { env } from '@yuki/env'
import { Button } from '@yuki/ui/button'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@yuki/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@yuki/ui/form'
import { Input } from '@yuki/ui/input'
import { toast } from '@yuki/ui/sonner'
import { signInSchema } from '@yuki/validators/auth'

import type { Route } from './+types/_auth.login'
import { useTRPC } from '@/lib/trpc/react'

export const action = ({ request }: Route.ActionArgs) => {
  try {
    const searchParams = new URLSearchParams(new URL(request.url).searchParams)
    const sessionToken = String(searchParams.get('sessionToken'))
    const expires = new Date(searchParams.get('expires') ?? '').toISOString()

    return redirect('/', {
      headers: {
        'Set-Cookie': `auth_token=${sessionToken}; Path=/; HttpOnly; ${env.NODE_ENV === 'production' ? 'Secure; ' : ''}SameSite=Lax; Max-Age=${Math.floor(
          (new Date(expires).getTime() - new Date().getTime()) / 1000,
        )}`,
      },
    })
  } catch (error) {
    if (error instanceof Error) return data({ error: error.message })
    return data({ error: 'An unknown error occurred' })
  }
}

export default function LoginPage(_: Route.ComponentProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>
    </>
  )
}

const LoginForm: React.FC = () => {
  const { trpcClient } = useTRPC()
  const submit = useSubmit()

  const form = useForm({
    schema: signInSchema,
    defaultValues: { email: '', password: '' },
    submitFn: trpcClient.auth.signIn.mutate,
    onSuccess: async (data) => {
      toast.success('You have successfully logged in!')
      await submit(
        {},
        {
          action: `/login?sessionToken=${data.sessionToken}&expires=${data.expires}`,
          method: 'POST',
          navigate: false,
        },
      )
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  return (
    <Form form={form}>
      <FormField
        name="email"
        render={(field) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl {...field}>
              <Input type="email" placeholder="yuki@example.com" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="password"
        render={(field) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl {...field}>
              <Input type="password" placeholder="••••••••" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button disabled={form.isPending}>Login</Button>
    </Form>
  )
}
