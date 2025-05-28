'use client'

import { useRouter } from 'next/navigation'

import type { RouterOutputs } from '@yuki/api'
import { Button } from '@yuki/ui/button'
import { useForm } from '@yuki/ui/form'
import { Input } from '@yuki/ui/input'
import { addSchema } from '@yuki/validators/address'

import { useTRPC } from '@/lib/trpc/react'

export const CreateOrEditAddressForm: React.FC<{
  id: string
  defaultValues: RouterOutputs['address']['byId']
}> = ({ id, defaultValues }) => {
  const { trpc, trpcClient, queryClient } = useTRPC()
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      ...defaultValues,
      id,
    },
    validator: addSchema,
    onSubmit:
      id === 'new'
        ? trpcClient.address.add.mutate
        : trpcClient.address.update.mutate,
    onSuccess: () => {
      router.back()
      return queryClient.invalidateQueries(trpc.address.all.queryFilter())
    },
  })

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="name"
        render={({ field, meta }) => (
          <div id={meta.id} className="grid gap-1">
            <form.Label>Name</form.Label>
            <form.Control {...field}>
              <Input placeholder="Pepe" />
            </form.Control>
            <form.Message />
          </div>
        )}
      />

      <form.Field
        name="phone"
        render={({ field, meta }) => (
          <div id={meta.id} className="grid gap-1">
            <form.Label>Phone</form.Label>
            <form.Control {...field}>
              <Input placeholder="(+123) 456 789 012" />
            </form.Control>
            <form.Message />
          </div>
        )}
      />

      <form.Field
        name="address"
        render={({ field, meta }) => (
          <div id={meta.id} className="grid gap-1">
            <form.Label>Address</form.Label>
            <form.Control {...field}>
              <Input placeholder="123 Main St" />
            </form.Control>
            <form.Message />
          </div>
        )}
      />

      <form.Field
        name="city"
        render={({ field, meta }) => (
          <div id={meta.id} className="grid gap-1">
            <form.Label>City</form.Label>
            <form.Control {...field}>
              <Input placeholder="Springfield" />
            </form.Control>
            <form.Message />
          </div>
        )}
      />

      <form.Field
        name="state"
        render={({ field, meta }) => (
          <div id={meta.id} className="grid gap-1">
            <form.Label>State</form.Label>
            <form.Control {...field}>
              <Input placeholder="IL" />
            </form.Control>
            <form.Message />
          </div>
        )}
      />

      <form.Field
        name="country"
        render={({ field, meta }) => (
          <div id={meta.id} className="grid gap-1">
            <form.Label>Country</form.Label>
            <form.Control {...field}>
              <Input placeholder="USA" />
            </form.Control>
            <form.Message />
          </div>
        )}
      />

      <form.Field
        name="zipCode"
        render={({ field, meta }) => (
          <div id={meta.id} className="grid gap-1">
            <form.Label>Zip Code</form.Label>
            <form.Control {...field}>
              <Input placeholder="62704" />
            </form.Control>
            <form.Message />
          </div>
        )}
      />

      <Button disabled={form.state.isPending}>
        {id === 'new' ? 'Create Address' : 'Update Address'}
      </Button>
    </form>
  )
}
