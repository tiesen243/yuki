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

export const NewAddressForm: React.FC = () => {
  const router = useRouter()
  const utils = api.useUtils()
  const { mutate, isPending, error } = api.user.newAddress.useMutation({
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
          {...field}
          error={error?.data?.zodError?.[field.name]?.at(0)}
          render={() => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl {...field} />
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
  { name: 'phone', label: 'Phone', placeholder: '(+84) 123 456 789', type: 'tel' },
  { name: 'state', label: 'State', placeholder: 'California', type: 'text' },
  { name: 'street', label: 'Street', placeholder: '1234 Yuki St', type: 'text' },
] as const
