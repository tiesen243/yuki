'use client'

import { useRouter } from 'next/navigation'

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

export const LoginForm: React.FC = () => {
  const { signIn } = useSession()
  const router = useRouter()

  const form = useForm({
    schema: signInSchema,
    defaultValues: { email: '', password: '' },
    submitFn: (values) => signIn('credentials', values),
    onSuccess: () => {
      router.push('/')
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  return (
    <Form form={form}>
      <FormField
        form={form}
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
        form={form}
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
