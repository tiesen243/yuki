import type { NextPage } from 'next'

import { PageClient } from '@/app/(dashboard)/users/[id]/page.client'
import { api, HydrateClient } from '@/lib/trpc/server'

const Page: NextPage<Props> = async ({ params }) => {
  void api.user.getOne.prefetch({ id: params.id })

  return (
    <HydrateClient>
      <PageClient id={params.id} />
    </HydrateClient>
  )
}

export default Page

interface Props {
  params: { id: string }
}
