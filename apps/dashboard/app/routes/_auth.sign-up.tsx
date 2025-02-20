import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'

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

import { useTRPC } from '@/lib/trpc/react'

export default function SignInPage() {
  const trpc = useTRPC()
  const navigate = useNavigate()

  const { mutate, isPending, error } = useMutation(
    trpc.auth.signUp.mutationOptions({
      onSuccess: async () => {
        await navigate({ pathname: '/' })
        toast.success('Account created successfully')
      },
      onError: (e) => toast.error(e.message),
    }),
  )

  return (
    <main className="flex grow items-center justify-center">
      <Card className="w-svh max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up for a new account</CardDescription>
        </CardHeader>

        <CardContent>
          <Form<typeof mutate>
            onSubmit={mutate}
            isPending={isPending}
            errors={error?.data?.zodError}
          >
            {fields.map((field) => (
              <FormField
                key={field.name}
                name={field.name}
                render={() => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button className="w-full" disabled={isPending}>
              Register
            </Button>
          </Form>
        </CardContent>

        <CardFooter>
          Already have an account?
          <Button
            variant="link"
            className="cursor-pointer"
            onClick={() => navigate({ pathname: '/sign-in' })}
          >
            Login here
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

const fields = [
  { name: 'name', label: 'Name', placeholder: 'Yuki', type: 'text' },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'yuki@example.com',
    type: 'email',
  },
  { name: 'password', label: 'password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
]
