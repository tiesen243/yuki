import type { NextPage } from 'next'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { DeleteCategoryPrompt } from '@/app/(dashboard)/categories/_components/delete-category-prompt'
import { api } from '@/lib/trpc/server'

const Page: NextPage<Props> = async ({ params }) => {
  const { category } = await api.category.getOne({ id: params.id })

  return (
    <>
      <CardHeader>
        <CardTitle>Delete {category.name}</CardTitle>
        <CardDescription>Are you sure you want to delete this category?</CardDescription>
      </CardHeader>

      <DeleteCategoryPrompt category={category} />
    </>
  )
}

export default Page

interface Props {
  params: { id: string }
}
