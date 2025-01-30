'use client'

import Form from 'next/form'
import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'

import { api } from '@/lib/trpc/react'

export const UpdateAddressForm: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()
  const utils = api.useUtils()
  const { data, isLoading } = api.user.getOneAddress.useQuery({ id })
  const { mutate, isPending, error } = api.user.updateAddress.useMutation({
    onSuccess: async () => {
      await utils.user.getAddress.invalidate()
      router.push('/account/address')
    },
  })

  if (isLoading)
    return (
      <div className="container mt-4 space-y-4">
        {fields.map((field) => (
          <fieldset key={field.name} disabled={true}>
            <Label htmlFor={field.name} className="capitalize">
              {field.name}
            </Label>
            <Input {...field} className="bg-background" />
          </fieldset>
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
        <fieldset key={field.name} disabled={isPending}>
          <Label htmlFor={field.name} className="capitalize">
            {field.name}
          </Label>
          <Input {...field} className="bg-background" defaultValue={data?.[field.name]} />
          <span className="text-destructive text-xs">
            {error?.data?.zodError?.[field.name]?.at(0)}
          </span>
        </fieldset>
      ))}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </Form>
  )
}

const fields = [
  {
    name: 'name' as const,
    placeholder: 'Yuki',
    type: 'text',
  },
  {
    name: 'phone' as const,
    placeholder: '(+84) 123 456 789',
    type: 'tel',
  },
  {
    name: 'state' as const,
    placeholder: 'California',
    type: 'text',
  },
  {
    name: 'street' as const,
    placeholder: '1234 Yuki St',
    type: 'text',
  },
]
