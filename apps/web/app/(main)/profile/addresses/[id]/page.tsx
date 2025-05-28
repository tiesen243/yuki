import { api } from '@/lib/trpc/server'
import { CreateOrEditAddressForm } from './page.client'

export default async function AddressPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params

  let defaultValues = {
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  }
  if (id !== 'new') defaultValues = await api.address.byId({ id })

  return <CreateOrEditAddressForm id={id} defaultValues={defaultValues} />
}
