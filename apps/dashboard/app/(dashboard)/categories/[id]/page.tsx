import type { NextPage } from 'next'

import { api, HydrateClient } from '@/lib/trpc/server'
import { PageClient } from './page.client'

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
