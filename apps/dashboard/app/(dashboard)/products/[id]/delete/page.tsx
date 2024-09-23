import type { NextPage } from 'next'

import { api } from '@/lib/trpc/server'
import { DeleteProductPrompt } from '../../_components/delete-product-prompt'

const Page: NextPage<Props> = async ({ params }) => {
  const { product } = await api.product.getOne({ id: params.id })

  return <DeleteProductPrompt product={product} />
}

export default Page

interface Props {
  params: { id: string }
}
