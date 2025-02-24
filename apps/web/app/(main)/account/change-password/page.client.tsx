'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'

import { Button } from '@yuki/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@yuki/ui/form'
import { toast } from '@yuki/ui/sonner'

import { useTRPC } from '@/lib/trpc/react'

export const ChangePasswordForm = () => {
  const router = useRouter()
  const trpc = useTRPC()

  const { mutate, isPending, error } = useMutation(
    trpc.auth.changePassword.mutationOptions({
      onError: (data) => toast.error(data.message),
      onSuccess: () => {
        router.push('/sign-in')
        toast.success('Password changed successfully')
      },
    }),
  )

  return (
    <Form<typeof mutate>
      className="container mt-4"
      defaultValues={{
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }}
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
              <FormControl type="password" />
              <FormMessage />
              {field.description && (
                <FormDescription>{field.description}</FormDescription>
              )}
            </FormItem>
          )}
        />
      ))}

      <Button className="w-full" disabled={isPending}>
        Change Password
      </Button>
    </Form>
  )
}

const fields = [
  {
    name: 'currentPassword',
    label: 'Current Password',
    description: "Keep it empty if you don't have a password yet",
  },
  {
    name: 'newPassword',
    label: 'New Password',
  },
  {
    name: 'confirmNewPassword',
    label: 'Confirm Password',
  },
]
