import { Typography } from '@yuki/ui/typography'

import { api, HydrateClient } from '@/lib/trpc/server'
import { CategoryListClient } from './category-list.client'

export const CategoryList: React.FC = async () => {
  void api.category.getAll.prefetch({ limit: 10 })

  return (
    <HydrateClient>
      <section className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Typography level="h2" className="col-span-2 md:col-span-4">
          Explore Categories
        </Typography>

        <CategoryListClient />
      </section>
    </HydrateClient>
  )
}
