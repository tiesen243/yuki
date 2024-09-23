
import type { NextPage } from 'next'

import { CardHeader, CardTitle } from '@yuki/ui/card'

import { UpdateProductForm } from '@/app/(dashboard)/products/_components/update-product-form'
import { api } from '@/lib/trpc/server'
import { UpdateUserForm } from '@/app/(dashboard)/customers/_components/update-user-form'

const Page: NextPage<Props> = async ({ params }) => {
  const { user } = await api.user.getOne({ id: params.id })

  return (
    <>
      <CardHeader>
        <CardTitle>Edit {user.name}</CardTitle>
      </CardHeader>

      <UpdateUserForm user={user} />
    </>
  )
}

export default Page

interface Props {
  params: { id: string }
}
