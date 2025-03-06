'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { signIn } from '@yuki/auth'
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

export const SignInForm: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string[]> | undefined>({})
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await signIn('credentials', data)

      if (!res?.success) {
        setErrors(res?.fieldErrors)
        throw new Error('Validation error')
      } else {
        setErrors({})
        return res
      }
    },
    onSuccess: async (data) => {
      router.push('/')
      router.refresh()
      await queryClient.invalidateQueries({ queryKey: ['auth'] })
      toast.success(data.message)
    },
    onError: (err) => toast.error(err.message),
  })
  return (
    <CardContent className="space-y-4">
      <Form<typeof mutate>
        defaultValues={{ email: '', password: '' }}
        onSubmit={mutate}
        isPending={isPending}
        errors={errors}
      >
        <FormField
          name="email"
          render={(field) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                placeholder="yuki@example.com"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          render={(field) => (
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
              <FormControl type="password" {...field} />
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
