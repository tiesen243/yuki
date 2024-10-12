'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { Query } from '@yuki/api'
import { Button } from '@yuki/ui/button'
import { FormField } from '@yuki/ui/form-field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@yuki/ui/select'

import { api } from '@/lib/trpc/react'
import { getIdFromSlug, slugify } from '@/lib/utils'

export const SearchForm: React.FC<{ searchParams: Query }> = ({ searchParams }) => {
  const { data } = api.category.getAll.useQuery({ limit: 9999 })
  const [query, setQuery] = useState<Query>(searchParams)

  return (
    <div className="space-y-4">
      <FormField
        label="Search"
        name="q"
        type="search"
        value={query.q}
        onChange={(e) => setQuery({ ...query, q: e.target.value })}
      />
      <FormField label="Category" name="category" asChild>
        <Select
          value={getIdFromSlug(query.category ?? '')}
          onValueChange={(value) => setQuery({ ...query, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value=" ">All</SelectItem>
            {data?.categories.map((category) => (
              <SelectItem key={category.id} value={slugify(category.id)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Sort" name="sort" asChild>
        <Select
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          value={query.sort || 'createdAt-desc'}
          onValueChange={(value: Options) => setQuery({ ...query, sort: value })}
        >
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

      <Button className="w-full" asChild>
        <Link href={{ query }}>Search</Link>
      </Button>
    </div>
  )
}

const sortOptions = [
  { label: 'Price Increase', value: 'price' },
  { label: 'Price Decrease', value: 'price-desc' },
  { label: 'Newest', value: 'createdAt' },
  { label: 'Oldest', value: 'createdAt-desc' },
]
type Options = 'price' | 'price-desc' | 'createdAt' | 'createdAt-desc'
