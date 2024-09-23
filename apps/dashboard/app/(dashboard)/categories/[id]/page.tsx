import type { NextPage } from 'next'

import { api } from '@/lib/trpc/server'
import { UpdateCategoryForm } from '../_components/update-category-form'

const Page: NextPage<Props> = async ({ params }) => {
  const { category } = await api.category.getOne({ id: params.id })

  return <UpdateCategoryForm category={category} />
}

export default Page

interface Props {
  params: { id: string }
}
