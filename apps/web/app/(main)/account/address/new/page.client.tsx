'use client'

import Form from 'next/form'
import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'

import { FormField } from '@/app/_components/form-field'
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
    <Form
      className="container mt-4 space-y-4"
      action={(formData) => {
        mutate({
          name: formData.get('name') as string,
          phone: formData.get('phone') as string,
          state: formData.get('state') as string,
          street: formData.get('street') as string,
        })
      }}
    >
      {fields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          disabled={isPending}
          error={error?.data?.zodError?.[field.name]?.at(0)}
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
