'use client'

import { useRouter } from 'next/navigation'

import type { SignUp } from '@yuki/api/types/user'
import { Button } from '@yuki/ui/button'
import { CardContent, CardDescription, CardFooter } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/hooks/use-toast'

import { api } from '@/lib/trpc/react'

export const SignUpForm: React.FC = () => {
  const router = useRouter()
  const signUp = api.user.signUp.useMutation({
    onError: (e) => !e.data?.zodError && toast({ type: 'destructive', title: e.message }),
    onSuccess: async () => {
      toast({ title: 'Register successfully', description: 'You will be navigate to sign in' })
      await new Promise((resolve) => setTimeout(resolve, 100))
      router.push('/sign-in')
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget)) as SignUp
        signUp.mutate(data)
        e.currentTarget.reset()
      }}
    >
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            disabled={signUp.isPending}
            message={signUp.error?.data?.zodError?.[field.name]?.at(0)}
          />
        ))}
      </CardContent>

      <CardFooter className="flex-col gap-4 *:w-full">
        <Button type="submit" disabled={signUp.isPending}>
          Register
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/api/auth/discord')}
          disabled={signUp.isPending}
        >
          Sign up with Discord
        </Button>

        <CardDescription>
          Already have an account?{' '}
          <Button
            type="button"
            variant="link"
            onClick={() => router.push('/sign-in')}
            disabled={signUp.isPending}
          >
            Sign in
          </Button>
        </CardDescription>
      </CardFooter>
    </form>
  )
}

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'yuki' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'yuki@example.com' },
  { name: 'password', label: 'Password', type: 'password', placeholder: '********' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: '********' },
]
