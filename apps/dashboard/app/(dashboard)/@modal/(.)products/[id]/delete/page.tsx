import type { NextPage } from 'next'

import { DeleteProductPrompt } from '@/app/(dashboard)/products/[id]/_components/delete-product-prompt'
import { api, HydrateClient } from '@/lib/trpc/server'

const Page: NextPage<Props> = async ({ params }) => {
  void api.product.getOne.prefetch({ id: params.id })

  return (
    <HydrateClient>
      <DeleteProductPrompt id={params.id} />
    </HydrateClient>
  )
}

export default Page

interface Props {
  params: { id: string }
}
