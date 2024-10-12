import type { NextPage } from 'next'

import type { PageProps } from '@/app/(dashboard)/_components/data-table'
import { api, HydrateClient } from '@/lib/trpc/server'
import { PageClient } from './page.client'

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  void api.user.getAll.prefetch({
    q: searchParams.q,
    page: Number(searchParams.page) || 1,
  })

  return (
    <HydrateClient>
      <PageClient searchParams={searchParams} />
    </HydrateClient>
  )
}

export default Page
