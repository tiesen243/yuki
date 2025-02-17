'use client'

import { useState } from 'react'
import NextForm from 'next/form'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

import { type Query } from '@yuki/api/validators/product'
import { Button } from '@yuki/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@yuki/ui/collapsible'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@yuki/ui/form'
import { ChevronDownIcon } from '@yuki/ui/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@yuki/ui/select'
import { cn } from '@yuki/ui/utils'

import { ProductCard, ProductCardSkeleton } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/react'
import { getIdFromSlug } from '@/lib/utils'

export const FilterSidebar: React.FC<Query & { slug?: string[] }> = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:hidden">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex w-full justify-between">
            Filters
            <ChevronDownIcon
              className={cn('size-4 transition-transform', isOpen && 'rotate-180')}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <FilterContent {...props} />
        </CollapsibleContent>
      </Collapsible>
      <FilterContent className="hidden w-48 md:block" {...props} />
    </>
  )
}

const FilterContent: React.FC<Query & { slug?: string[]; className?: string }> = ({
  slug,
  className,
  ...query
}) => {
  const { data: categories = [] } = api.category.getAll.useQuery({ limit: 999 })
  const [category, setCategory] = useState(getIdFromSlug(slug?.at(0)))

  return (
    <Form className={cn('min-w-48 space-y-2 md:space-y-4', className)} asChild>
      <NextForm action={`/shop/${category}`}>
        <FormField
          name="q"
          render={() => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl placeholder="Search products..." defaultValue={query.q} />
            </FormItem>
          )}
        />

        <FormField
          name="category"
          render={() => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select value={category} onValueChange={setCategory}>
                <FormControl asChild>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={' '}>None</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.name} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name="sortBy"
          render={() => (
            <FormItem>
              <FormLabel>Sort by</FormLabel>
              <Select defaultValue={query.sortBy}>
                <FormControl asChild>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="createdAt">Date</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          name="orderBy"
          render={() => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <Select defaultValue={query.orderBy}>
                <FormControl asChild>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <input name="limit" defaultValue={query.limit} hidden />

        <SubmitButton className="w-full">Apply Filters</SubmitButton>
      </NextForm>
    </Form>
  )
}

export const ProductList: React.FC<Query> = (query) => {
  const [{ products }] = api.product.getAll.useSuspenseQuery(query)

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

export const ProductListSkeleton: React.FC<{ limit: number }> = ({ limit }) => (
  <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
    {Array.from({ length: limit }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)

export const ProductPagination: React.FC<Query> = (query) => {
  const [{ totalPage }] = api.product.getAll.useSuspenseQuery(query)

  if (totalPage <= 1) return

  const PageButton = ({ p }: { p: number }) => (
    <Button
      variant="outline"
      size="icon"
      className={p === query.page ? 'bg-accent text-accent-foreground' : ''}
      asChild
    >
      <Link href={{ query: { ...query, page: p } }}>{p}</Link>
    </Button>
  )

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {totalPage <= 5 ? (
        Array.from({ length: totalPage }).map((_, idx) => (
          <PageButton key={idx + idx} p={idx + 1} />
        ))
      ) : query.page < 4 ? (
        <>
          {Array.from({ length: 5 }).map((_, idx) => (
            <PageButton key={idx + 1} p={idx + 1} />
          ))}
          <span>...</span>
          <PageButton p={totalPage} />
        </>
      ) : query.page >= totalPage - 2 ? (
        <>
          <PageButton p={1} />
          <span>...</span>
          {Array.from({ length: 5 }).map((_, idx) => (
            <PageButton key={totalPage - 4 + idx} p={totalPage - 4 + idx} />
          ))}
        </>
      ) : (
        <>
          <PageButton p={1} />
          <span>...</span>
          {Array.from({ length: 5 }, (_, i) => query.page - 2 + i).map((i) => (
            <PageButton key={i} p={i} />
          ))}
          <span>...</span>
          <PageButton p={totalPage} />
        </>
      )}
    </div>
  )
}

export const ProductPaginationSkeleton: React.FC = () => (
  <div className="mt-4 flex items-center justify-center gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <Button key={i} variant="outline" size="icon" className="bg-accent animate-pulse" />
    ))}
  </div>
)

export const SubmitButton: React.FC<React.ComponentProps<'button'>> = (props) => {
  const { pending } = useFormStatus()
  return <Button {...props} disabled={pending} />
}
