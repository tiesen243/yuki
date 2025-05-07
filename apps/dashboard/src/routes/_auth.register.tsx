import { Link, useNavigate } from 'react-router'

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
import { signUpSchema } from '@yuki/validators/auth'

import { useTRPC } from '@/lib/trpc/react'

export default function RegisterPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Enter your credentials below to register for an account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <RegisterForm />

        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </p>
      </CardContent>
    </>
  )
}

const RegisterForm: React.FC = () => {
  const router = useNavigate()
  const { trpcClient } = useTRPC()

  const form = useForm({
    schema: signUpSchema,
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    submitFn: trpcClient.auth.signUp.mutate,
    onSuccess: () => {
      toast.success('You have successfully registered!')
      void router('/login')
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  return (
    <Form form={form}>
      {formItems.map((item) => (
        <FormField
          key={item.name}
          name={item.name}
          render={(field) => (
            <FormItem>
              <FormLabel>{item.label}</FormLabel>
              <FormControl {...field}>
                <Input {...item} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      <Button disabled={form.isPending}>Register</Button>
    </Form>
  )
}

const formItems = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Yuki',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'yuki@example.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: '••••••••',
  },
]
