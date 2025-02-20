import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@yuki/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
} from '@yuki/ui/form'
import { toast } from '@yuki/ui/sonner'

import { env } from '@/env'
import { useTRPC } from '@/lib/trpc/react'

export default function SignInPage() {
  const trpc = useTRPC()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation(
    trpc.auth.signIn.mutationOptions({
      onSuccess: async (data) => {
        document.cookie = [
          `auth_token=${data.token}`,
          'Path=/',
          `Expires=${data.expiresAt.toUTCString()}`,
          env.NODE_ENV === 'production' ? 'Secure' : '',
          'SameSite=Lax',
        ]
          .filter(Boolean)
          .join('; ')

        await queryClient.invalidateQueries({ queryKey: ['auth'] })
        await navigate({ pathname: '/' })
        toast.success('Logged in successfully')
      },
      onError: (e) => toast.error(e.message),
    }),
  )

  return (
    <main className="flex grow items-center justify-center">
      <Card className="w-svh max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form<typeof mutate>
            onSubmit={mutate}
            isPending={isPending}
            errors={error?.data?.zodError}
          >
            <FormField
              name="email"
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
              render={() => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl type="password" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isPending}>
              Log in
            </Button>
          </Form>
        </CardContent>

        <CardFooter>
          Don&apos;t have an account?
          <Button
            variant="link"
            className="cursor-pointer"
            onClick={() => navigate({ pathname: '/sign-up' })}
          >
            Register here
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
