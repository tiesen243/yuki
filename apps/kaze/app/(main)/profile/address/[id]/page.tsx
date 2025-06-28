import { api } from '@/trpc/rsc'
import { CreateOrEditAddressForm } from './page.client'

export default async function AddressPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params

  let defaultValues = {
    id: '',
    default: false,
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  }
  if (id !== 'new') defaultValues = await api.address.byId({ id })

  return <CreateOrEditAddressForm id={id} defaultValues={defaultValues} />
}
