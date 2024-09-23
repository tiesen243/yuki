import type { NextPage } from 'next'

import { api } from '@/lib/trpc/server'
import { UpdateProductForm } from '../_components/update-product-form'

const Page: NextPage<Props> = async ({ params }) => {
  const { product } = await api.product.getOne({ id: params.id })
  const categories = await api.category.getAll({})
  return <UpdateProductForm product={product} categories={categories} />
}

export default Page

interface Props {
  params: { id: string }
}
