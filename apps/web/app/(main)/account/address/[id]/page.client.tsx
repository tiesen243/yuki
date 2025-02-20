'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export const UpdateAddressForm: React.FC<{ id: string }> = ({ id }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const trpc = useTRPC()
  const { mutate, isPending, error } = useMutation(
    trpc.user.updateAddress.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.user.getAddresses.queryKey(),
        })
        router.push('/account/address')
      },
    }),
  )

  const { data } = useQuery(trpc.user.getOneAddress.queryOptions({ id }))

  return (
    <Form<typeof mutate>
      className="container mt-4"
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
              <FormControl {...field} defaultValue={data?.[field.name]} />
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </Form>
  )
}

const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'state', label: 'State', type: 'text' },
  { name: 'street', label: 'Street', type: 'text' },
] as const
