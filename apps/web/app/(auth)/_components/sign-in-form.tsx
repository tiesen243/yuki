'use client'

import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@yuki/ui/form'
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
    <CardContent className="space-y-4">
      <Form<typeof mutate> isPending={isPending} onSubmit={mutate}>
        <FormField
          name="email"
          error={error?.data?.zodError?.email?.at(0)}
          render={() => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl type="email" placeholder="yuki@example.com" />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          error={error?.data?.zodError?.password?.at(0)}
          render={() => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <a
                  className="cursor-pointer text-sm underline-offset-2 hover:underline"
                  onClick={() => {
                    router.push('/forgot-password')
                  }}
                >
                  Forgot your password?
                </a>
              </div>
              <FormControl type="password" />
              <FormMessage />
            </FormItem>
          )}
        />

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
      </Form>
    </CardContent>
  )
}
