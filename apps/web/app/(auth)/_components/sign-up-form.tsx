'use client'

import Form from 'next/form'
import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'

import { api } from '@/lib/trpc/react'

export const SignUpForm = () => {
  const router = useRouter()
  const { mutate, isPending, error } = api.auth.signUp.useMutation()

  return (
    <Form
      action={(formData) => {
        mutate({
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          password: formData.get('password') as string,
          confirmPassword: formData.get('confirmPassword') as string,
        })
      }}
    >
      <CardContent className="space-y-2">
        {fields.map((field) => (
          <fieldset key={field.name}>
            <Label htmlFor={field.name} className="capitalize">
              {field.label ?? field.name}
            </Label>
            <Input {...field} />
            <span className="text-destructive text-xs">
              {error?.data?.zodError?.[field.name]?.at(0)}
            </span>
          </fieldset>
        ))}

        <p className="text-xs">
          Already have an account?{' '}
          <Button
            variant="link"
            type="button"
            onClick={() => {
              router.push('/sign-in')
            }}
          >
            Sign In
          </Button>
        </p>
        <Button type="submit" className="w-full" disabled={isPending}>
          Register
        </Button>
      </CardContent>
    </Form>
  )
}

const fields = [
  { name: 'name', placeholder: 'Yuki', type: 'text' },
  { name: 'email', placeholder: 'yuki@kaze.com', type: 'email' },
  { name: 'password', placeholder: 'Password', type: 'password' },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
    type: 'password',
  },
]
