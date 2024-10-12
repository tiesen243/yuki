import type { NextPage } from 'next'

import { PageClient } from '@/app/(dashboard)/categories/[id]/delete/page.client'
import { api, HydrateClient } from '@/lib/trpc/server'

const Page: NextPage<Props> = async ({ params }) => {
  void api.category.getOne.prefetch({ id: params.id })

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
