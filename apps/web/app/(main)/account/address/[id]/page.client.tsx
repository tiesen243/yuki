'use client'

import Form from 'next/form'
import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'

import { FormField } from '@/app/_components/form-field'
import { api } from '@/lib/trpc/react'

export const UpdateAddressForm: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()
  const utils = api.useUtils()
  const { data, isLoading } = api.user.getOneAddress.useQuery({ id })
  const { mutate, isPending, error } = api.user.updateAddress.useMutation({
    onSuccess: async () => {
      await utils.user.getAddresses.invalidate()
      router.push('/account/address')
    },
  })

  if (isLoading || !data)
    return (
      <div className="container mt-4 space-y-4">
        {fields.map((field) => (
          <FormField key={field.name} {...field} />
        ))}
        <Button className="w-full" disabled={true}>
          Loading...
        </Button>
      </div>
    )

  return (
    <Form
      className="container mt-4 space-y-4"
      action={(formData) => {
        mutate({
          id,
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
          defaultValue={data[field.name]}
          disabled={isPending}
          error={error?.data?.zodError?.[field.name]?.at(0)}
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
