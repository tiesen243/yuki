import type { RouterOutputs } from '@yuki/api'

import { api } from '@/trpc/rsc'
import { CreateOrEditAddressForm } from './page.client'

export default async function AddressPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params

  let defaultValues = {
    id: 'new',
    name: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false,
  } as RouterOutputs['address']['byId']
  if (id !== 'new') defaultValues = await api.address.byId({ id })

  return <CreateOrEditAddressForm id={id} defaultValues={defaultValues} />
}
