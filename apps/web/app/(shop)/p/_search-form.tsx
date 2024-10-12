import type { Query } from '@yuki/api'
import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@yuki/ui/select'

import { api } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'

export const SearchForm: React.FC<{ searchParams: Query }> = async ({ searchParams }) => {
  const categories = await api.category.getAll({ limit: 9999 })

  return (
    <form className="space-y-4">
      <FormField label="Search" name="q" type="search" defaultValue={searchParams.q} />
      <FormField label="Category" name="category" asChild>
        <Select defaultValue={getIdFromSlug(searchParams.category ?? '')}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            {categories.categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Sort" name="sort" asChild>
        {/*  eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
        <Select defaultValue={searchParams.sort || 'createdAt-desc'}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="price">Price Increase</SelectItem>
            <SelectItem value="price-desc">Price Decrease</SelectItem>
            <SelectItem value="createdAt">Newest</SelectItem>
            <SelectItem value="createdAt-desc">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <Button className="w-full">Search</Button>
    </form>
  )
}
