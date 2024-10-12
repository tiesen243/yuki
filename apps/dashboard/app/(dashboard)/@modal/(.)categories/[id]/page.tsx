import type { NextPage } from 'next'

import { CardHeader, CardTitle } from '@yuki/ui/card'

import { UpdateCategoryForm } from '@/app/(dashboard)/categories/[id]/_components/update-category-form'
import { api } from '@/lib/trpc/server'

const Page: NextPage<Props> = async ({ params }) => {
  const { category } = await api.category.getOne({ id: params.id })

  return (
    <>
      <CardHeader>
        <CardTitle>Edit {category.name}</CardTitle>
      </CardHeader>

      <UpdateCategoryForm category={category} />
    </>
  )
}

export default Page

interface Props {
  params: { id: string }
}
