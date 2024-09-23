import type { NextPage } from 'next'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { CreateProductForm } from '@/app/(dashboard)/products/_components/create-product-form'
import { api } from '@/lib/trpc/server'

const Page: NextPage = async () => {
  const { categories } = await api.category.getAll({ limit: 9999 })

  return (
    <>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
        <CardDescription>Fill out the form below to create a new product</CardDescription>
      </CardHeader>

      <CreateProductForm categories={categories} />
    </>
  )
}

export default Page
