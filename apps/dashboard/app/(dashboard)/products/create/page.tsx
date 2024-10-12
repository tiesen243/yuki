import type { NextPage } from 'next'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { api, HydrateClient } from '@/lib/trpc/server'
import { CreateProductForm } from './page.client'

const Page: NextPage = async () => {
  void api.category.getAll({ limit: 9999 })

  return (
    <HydrateClient>
      <CardHeader className="p-4 pb-0">
        <CardTitle>Create Product</CardTitle>
        <CardDescription>Fill out the form below to create a new product</CardDescription>
      </CardHeader>

      <CreateProductForm />
    </HydrateClient>
  )
}
export default Page
