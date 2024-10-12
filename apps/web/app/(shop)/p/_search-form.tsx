import { redirect } from 'next/navigation'

import type { Query } from '@yuki/api'
import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@yuki/ui/select'

import { api } from '@/lib/trpc/server'
import { getIdFromSlug, slugify } from '@/lib/utils'

export const SearchForm: React.FC<{ searchParams: Query }> = async ({ searchParams }) => {
  const { categories } = await api.category.getAll({ limit: 9999 })

  const action = async (formData: FormData) => {
    'use server'
    const params = {
      q: formData.get('q'),
      category: formData.get('category'),
      sort: formData.get('sort'),
    }
    // @ts-expect-error `Object.fromEntries` returns `Query` type
    const query = new URLSearchParams({ ...searchParams, ...params }).toString()
    redirect(`/p?${query}`)
  }

  return (
    <form action={action} className="space-y-4">
      <FormField label="Search" name="q" type="search" />
      <FormField label="Category" name="category" asChild>
        <Select defaultValue={getIdFromSlug(searchParams.category ?? '')}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={slugify(category.id)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Sort" name="sort" asChild>
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
        <Select defaultValue={searchParams.sort || 'createdAt-desc'}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <Button className="w-full">Search</Button>
    </form>
  )
}

const sortOptions = [
  { label: 'Price Increase', value: 'price-asc' },
  { label: 'Price Decrease', value: 'price-desc' },
  { label: 'Newest', value: 'createdAt-desc' },
  { label: 'Oldest', value: 'createdAt-asc' },
]
