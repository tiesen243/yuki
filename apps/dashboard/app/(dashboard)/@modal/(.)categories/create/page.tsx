import type { NextPage } from 'next'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { CreateCategoryForm } from '@/app/(dashboard)/categories/_components/create-category-form'

const Page: NextPage = async () => (
  <>
    <CardHeader>
      <CardTitle>Create Category</CardTitle>
      <CardDescription>Fill out the form below to create a new category</CardDescription>
    </CardHeader>

    <CreateCategoryForm />
  </>
)

export default Page
