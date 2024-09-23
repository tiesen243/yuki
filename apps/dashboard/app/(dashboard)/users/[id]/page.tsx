import type { NextPage } from 'next'

import { api } from '@/lib/trpc/server'
import { UpdateUserForm } from '../_components/update-user-form'

const Page: NextPage<Props> = async ({ params }) => {
  const { product } = await api.product.getOne({ id: params.id })
  return <UpdateUserForm />
}

export default Page

interface Props {
  params: { id: string }
}
