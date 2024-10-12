import type { NextPage } from 'next'

import type { Query } from '@yuki/api'

import { api, HydrateClient } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'
import { PageClient } from './page.client'

const Page: NextPage<{ searchParams: Query }> = ({ searchParams }) => {
  void api.product.getAll({
    q: searchParams.q,
    page: Number(searchParams.page) || 1,
    category: getIdFromSlug(searchParams.category ?? ''),
  })

  return (
    <HydrateClient>
      <PageClient searchParams={searchParams} />
    </HydrateClient>
  )
}

export default Page
