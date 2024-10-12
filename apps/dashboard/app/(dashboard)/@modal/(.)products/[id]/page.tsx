import type { NextPage } from 'next'

import { UpdateProductForm } from '@/app/(dashboard)/products/[id]/_components/update-product-form'
import { api, HydrateClient } from '@/lib/trpc/server'

const Page: NextPage<Props> = async ({ params }) => {
  void api.product.getOne.prefetch({ id: params.id })
  void api.category.getAll.prefetch({ limit: 9999 })

  return (
    <HydrateClient>
      <UpdateProductForm id={params.id} />
    </HydrateClient>
  )
}

export default Page

interface Props {
  params: { id: string }
}
