import type { NextPage } from 'next'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { CreateProductForm } from '@/app/(dashboard)/products/create/page.client'
import { api, HydrateClient } from '@/lib/trpc/server'

const Page: NextPage = async () => {
  void api.category.getAll({ limit: 9999 })

  return (
    <HydrateClient>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
        <CardDescription>Fill out the form below to create a new product</CardDescription>
      </CardHeader>

      <CreateProductForm />
    </HydrateClient>
  )
}

export default Page
