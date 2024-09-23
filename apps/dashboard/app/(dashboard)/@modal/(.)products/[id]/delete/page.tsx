import type { NextPage } from 'next'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { DeleteProductPrompt } from '@/app/(dashboard)/products/_components/delete-product-prompt'
import { api } from '@/lib/trpc/server'

const Page: NextPage<Props> = async ({ params }) => {
  const { product } = await api.product.getOne({ id: params.id })

  return (
    <>
      <CardHeader>
        <CardTitle>Delete {product.name}</CardTitle>
        <CardDescription>Are you sure you want to delete this product?</CardDescription>
      </CardHeader>

      <DeleteProductPrompt product={product} />
    </>
  )
}

export default Page

interface Props {
  params: { id: string }
}
