'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { CardContent, CardFooter } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export const ForgotPasswordForm = () => {
  const router = useRouter()
  const { mutate, isPending, error } = api.auth.forgotPassword.useMutation({
    onSuccess: () =>
      toast.success('Reset email sent', {
        description: (
          <p>
            If an account with that email exists, we will send you an email with instructions on how
            to reset your password. Please check your inbox.
          </p>
        ),
      }),
    onError: (e) => !e.data?.zodError && toast.error(e.message),
  })

  const action = async (formData: FormData) => {
    const email = String(formData.get('email'))
    mutate({ email })
  }

  return (
    <form action={action}>
      <CardContent>
        <FormField
          name="email"
          label="Email"
          type="email"
          message={error?.data?.zodError?.email?.at(0)}
          disabled={isPending}
        />
      </CardContent>

      <CardFooter className="justify-end gap-4">
        <Button disabled={isPending}>Send Reset Email</Button>
        <Button variant="secondary" disabled={isPending} onClick={() => router.push('/sign-in')}>
          Cancel
        </Button>
      </CardFooter>
    </form>
  )
}
