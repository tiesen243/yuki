import type { NextPage } from 'next'

import { api } from '@/lib/trpc/server'
import { DeleteCategoryPrompt } from '../../_components/delete-category-prompt'

const Page: NextPage<Props> = async ({ params }) => {
  const { category } = await api.category.getOne({ id: params.id })

  return <DeleteCategoryPrompt category={category} />
}

export default Page

interface Props {
  params: { id: string }
}
