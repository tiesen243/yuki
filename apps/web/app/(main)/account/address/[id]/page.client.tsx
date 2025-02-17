'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@yuki/ui/form'

import { api } from '@/lib/trpc/react'

export const UpdateAddressForm: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()
  const utils = api.useUtils()
  const { data } = api.user.getOneAddress.useQuery({ id })
  const { mutate, isPending, error } = api.user.updateAddress.useMutation({
    onSuccess: async () => {
      await utils.user.getAddresses.invalidate()
      router.push('/account/address')
    },
  })

  return (
    <Form<typeof mutate>
      className="container mt-4"
      onSubmit={mutate}
      isPending={isPending}
    >
      {fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          error={error?.data?.zodError?.[field.name]?.at(0)}
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
