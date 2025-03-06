'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from '@yuki/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@yuki/ui/form'

import { useTRPC } from '@/lib/trpc/react'

export const NewAddressForm: React.FC = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const trpc = useTRPC()
  const { mutate, isPending, error } = useMutation(
    trpc.user.newAddress.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.user.getAddresses.queryKey(),
        })

        router.refresh()
        router.push('/account/address')
      },
    }),
  )

  return (
    <Form<typeof mutate>
      className="container mt-4"
      defaultValues={{ name: '', phone: '', state: '', street: '' }}
      onSubmit={mutate}
      isPending={isPending}
      errors={error?.data?.zodError}
    >
      {fields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          render={(fieldProps) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl {...fieldProps} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Address'}
      </Button>
    </Form>
  )
}

const fields = [
  { name: 'name', label: 'Name', placeholder: 'Yuki', type: 'text' },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: '(+84) 123 456 789',
    type: 'tel',
  },
  { name: 'state', label: 'State', placeholder: 'California', type: 'text' },
  {
    name: 'street',
    label: 'Street',
    placeholder: '1234 Yuki St',
    type: 'text',
  },
] as const
