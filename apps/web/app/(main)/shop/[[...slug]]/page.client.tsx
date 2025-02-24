'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useFormStatus } from 'react-dom'

import { type Query } from '@yuki/api/validators/product'
import { Button } from '@yuki/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@yuki/ui/collapsible'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@yuki/ui/form'
import { ChevronDownIcon } from '@yuki/ui/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@yuki/ui/select'
import { cn } from '@yuki/ui/utils'

import { ProductCard } from '@/app/(main)/_components/product-card'
import { useTRPC } from '@/lib/trpc/react'
import { slugify } from '@/lib/utils'

export const FilterSidebar: React.FC<{ slug?: string[] }> = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:hidden">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex w-full justify-between">
            Filters
            <ChevronDownIcon
              className={cn(
                'size-4 transition-transform',
                isOpen && 'rotate-180',
              )}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <Suspense>
            <FilterContent {...props} />
          </Suspense>
        </CollapsibleContent>
      </Collapsible>

      <Suspense>
        <FilterContent className="hidden w-48 md:block" {...props} />
      </Suspense>
    </>
  )
}

const FilterContent: React.FC<{ slug?: string[]; className?: string }> = ({
  slug,
  className,
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const trpc = useTRPC()

  const { data: categories = [] } = useQuery(
    trpc.category.getAll.queryOptions({ limit: 999 }),
  )

  const handleFilter = (data: {
    q: string
    category?: string
    sortBy: string
    orderBy: string
    limit: number
  }) => {
    const searchParams = new URLSearchParams()

    // Only add params that have values
    if (data.q) searchParams.set('q', data.q)
    if (data.sortBy) searchParams.set('sortBy', data.sortBy)
    if (data.orderBy) searchParams.set('orderBy', data.orderBy)
    if (data.limit) searchParams.set('limit', data.limit.toString())

    router.push(`/shop/${data.category ?? ''}?${searchParams.toString()}`)
  }

  return (
    <Form<typeof handleFilter>
      className={cn('min-w-48 space-y-2 md:space-y-4', className)}
      defaultValues={{
        q: searchParams.get('q') ?? '',
        category: slug?.at(0),
        sortBy: searchParams.get('sortBy') ?? 'createdAt',
        orderBy: searchParams.get('orderBy') ?? 'asc',
        limit: +(searchParams.get('limit') ?? 20),
      }}
      onSubmit={handleFilter}
    >
      <FormField
        name="q"
        render={(field) => (
          <FormItem>
            <FormLabel>Search</FormLabel>
            <FormControl placeholder="Search products..." {...field} />
          </FormItem>
        )}
      />

      <FormField
        name="category"
        render={(field) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl asChild>
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={' '}>None</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.name} value={`${slugify(c.name)}-${c.id}`}>
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
        render={(field) => (
          <FormItem>
            <FormLabel>Sort by</FormLabel>
            <Select
              name="sortBy"
              value={field.value}
              onValueChange={field.onChange}
            >
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
        render={(field) => (
          <FormItem>
            <FormLabel>Order</FormLabel>
            <Select
              name="orderBy"
              value={field.value}
              onValueChange={field.onChange}
            >
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

      <SubmitButton className="w-full">Apply Filters</SubmitButton>
    </Form>
  )
}

export const SubmitButton: React.FC<React.ComponentProps<'button'>> = (
  props,
) => {
  const { pending } = useFormStatus()
  return <Button {...props} disabled={pending} />
}

export const ProductList: React.FC<Query> = (query) => {
  const trpc = useTRPC()

  const {
    data: { products },
  } = useSuspenseQuery(trpc.product.getAll.queryOptions(query))

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

export const ProductPagination: React.FC<Query> = (query) => {
  const trpc = useTRPC()

  const {
    data: { totalPage },
  } = useSuspenseQuery(trpc.product.getAll.queryOptions(query))

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
