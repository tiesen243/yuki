import type { NextPage } from 'next'

import { api, HydrateClient } from '@/lib/trpc/server'
import { DeleteProductPrompt } from '../_components/delete-product-prompt'

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
