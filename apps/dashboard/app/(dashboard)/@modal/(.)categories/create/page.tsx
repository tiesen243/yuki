import type { NextPage } from 'next'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { PageClient } from '@/app/(dashboard)/categories/create/page.client'

const Page: NextPage = async () => (
  <>
    <CardHeader>
      <CardTitle>Create Category</CardTitle>
      <CardDescription>Fill out the form below to create a new category</CardDescription>
    </CardHeader>

    <PageClient />
  </>
)

export default Page
