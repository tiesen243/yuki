'use client'

import { useRouter } from 'next/navigation'
import { useQueryStates } from 'nuqs'

import { useSession } from '@yuki/auth/react'
import { Button } from '@yuki/ui/button'
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

import { useTRPC } from '@/lib/trpc/react'
import { redirect } from '../_search-params'

export const LoginForm: React.FC = () => {
  const [{ redirectTo }] = useQueryStates(redirect.parsers, redirect.configs)
  const { trpcClient } = useTRPC()
  const { refresh } = useSession()
  const router = useRouter()

  const form = useForm({
    schema: signInSchema,
    defaultValues: { email: '', password: '' },
    submitFn: trpcClient.auth.signIn.mutate,
    onSuccess: async (userId) => {
      try {
        const res = await fetch('/api/auth/sign-in', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        })

        if (!res.ok) {
          const errorData = await res.text()
          toast.error(`Failed to sign in: ${errorData || 'Unknown error'}`)
          return
        }

        const { token } = (await res.json()) as { token: string }
        await refresh(token)

        toast.success('You have successfully logged in!')

        // Determine redirect URL with cleaner conditional
        const url = /^(https?|exp):\/\//.test(redirectTo)
          ? `${redirectTo}${redirectTo.includes('?') ? '&' : '?'}token=${token}`
          : redirectTo

        router.push(url)
      } catch (error) {
        console.error('Login error:', error)
        toast.error('An unexpected error occurred')
      }
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
