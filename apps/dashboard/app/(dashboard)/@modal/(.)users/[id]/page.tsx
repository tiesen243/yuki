import type { NextPage } from 'next'

import { CardHeader, CardTitle } from '@yuki/ui/card'

import { UpdateUserForm } from '@/app/(dashboard)/users/_components/update-user-form'
import { api } from '@/lib/trpc/server'

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
