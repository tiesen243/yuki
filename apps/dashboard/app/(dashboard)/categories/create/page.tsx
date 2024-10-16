import type { NextPage } from 'next'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { PageClient } from './page.client'

const Page: NextPage = async () => (
  <>
    <CardHeader className="p-4 pb-0">
      <CardTitle>Create Product</CardTitle>
      <CardDescription>Fill out the form below to create a new product</CardDescription>
    </CardHeader>

    <PageClient />
  </>
)
export default Page
