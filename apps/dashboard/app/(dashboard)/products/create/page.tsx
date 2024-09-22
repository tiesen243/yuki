import type { NextPage } from 'next'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { api } from '@/lib/trpc/server'
import { CreateProductForm } from '../_components/create-product-form'

const Page: NextPage = async () => {
  const categories = await api.category.getAll({})

  return (
    <>
      <CardHeader className="p-4 pb-0">
        <CardTitle>Create Product</CardTitle>
        <CardDescription>Fill out the form below to create a new product</CardDescription>
      </CardHeader>

      <CreateProductForm categories={categories} />
    </>
  )
}
export default Page
