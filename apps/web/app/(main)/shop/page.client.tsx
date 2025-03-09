'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useQueryStates } from 'nuqs'

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
import { useIsMobile } from '@yuki/ui/hooks/use-mobile'
import { ChevronUpIcon, FilterIcon } from '@yuki/ui/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@yuki/ui/select'

import { shopSearchParsers } from '@/lib/search'
import { useTRPC } from '@/lib/trpc/react'
import { ProductCard } from '../_components/product-card'

export const ProductFilter: React.FC = () => {
  const isMobile = useIsMobile()

  if (isMobile)
    return (
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className='w-full justify-between data-[state="open"]:[&_svg]:-rotate-180'
          >
            <span className="flex items-center gap-2">
              <FilterIcon size={16} /> Filter
            </span>

            <ChevronUpIcon className="transform transition-transform" />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <ProductFilterForm />
        </CollapsibleContent>
      </Collapsible>
    )

  return <ProductFilterForm />
}

const ProductFilterForm: React.FC = () => {
  const trpc = useTRPC()
  const { data: categories } = useSuspenseQuery(
    trpc.category.getAll.queryOptions({ limit: 999 }),
  )
  const [query, setSearchParams] = useQueryStates(shopSearchParsers)

  const handleSubmit = (formData: typeof query) => {
    void setSearchParams({ ...query, ...formData })
  }

  return (
    <Form<typeof handleSubmit>
      defaultValues={query}
      onSubmit={handleSubmit}
      className="mt-2 flex flex-col gap-2 md:mt-0"
    >
      <span className="sr-only flex items-center gap-2 font-bold md:not-sr-only">
        <FilterIcon size={16} /> Filter
      </span>

      <FormField
        name="q"
        render={(props) => (
          <FormItem>
            <FormLabel className="hidden md:flex">Search</FormLabel>
            <FormControl {...props} type="search" placeholder="Search..." />
          </FormItem>
        )}
      />

      <FormField
        name="category"
        render={({ value, onChange }) => (
          <FormItem className="*:w-full">
            <FormLabel className="hidden md:flex">Category</FormLabel>

            <Select defaultValue={value} onValueChange={onChange}>
              <FormControl asChild>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        name="sortBy"
        render={({ value, onChange }) => (
          <FormItem className="*:w-full">
            <FormLabel className="hidden md:flex">Sort By</FormLabel>

            <Select defaultValue={value} onValueChange={onChange}>
              <FormControl asChild>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="createdAt">Created At</SelectItem>
                <SelectItem value="updatedAt">Updated At</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        name="orderBy"
        render={({ value, onChange }) => (
          <FormItem className="*:w-full">
            <FormLabel className="hidden md:flex">Order</FormLabel>
            <Select defaultValue={value} onValueChange={onChange}>
              <FormControl asChild>
                <SelectTrigger>
                  <SelectValue placeholder="Order" />
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

      <Button type="submit">Apply Filter</Button>
    </Form>
  )
}

export const ProductList: React.FC = () => {
  const trpc = useTRPC()
  const [query] = useQueryStates(shopSearchParsers)
  const {
    data: { products },
  } = useSuspenseQuery(trpc.product.getAll.queryOptions(query))

  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ))
}

export const Pagination: React.FC = () => {
  const trpc = useTRPC()
  const [query, setSearchParams] = useQueryStates(shopSearchParsers)
  const {
    data: { totalPage },
  } = useSuspenseQuery(trpc.product.getAll.queryOptions(query))

  const pages = [
    <Button
      key={1}
      variant={query.page === 1 ? 'secondary' : 'outline'}
      size="icon"
      onClick={() => setSearchParams({ ...query, page: 1 })}
      disabled={query.page === 1}
    >
      1
    </Button>,
  ]

  // When query.page <= 3: render 1 2 3 ... totalPage
  if (query.page < 3) {
    for (let i = 2; i <= Math.min(3, totalPage); i++) {
      pages.push(
        <Button
          key={i}
          variant={query.page === i ? 'secondary' : 'outline'}
          size="icon"
          onClick={() => setSearchParams({ ...query, page: i })}
          disabled={query.page === i}
        >
          {i}
        </Button>,
      )
    }

    if (totalPage > 3) {
      pages.push(
        <Button key="ellipsis1" variant="link" size="icon" disabled>
          ...
        </Button>,
        <Button
          key={totalPage}
          variant={query.page === totalPage ? 'secondary' : 'outline'}
          size="icon"
          onClick={() => setSearchParams({ ...query, page: totalPage })}
        >
          {totalPage}
        </Button>,
      )
    }
  }

  // When query.page > totalPage - 3: render 1 ... totalPage-2 totalPage-1 totalPage
  else if (query.page > totalPage - 2) {
    if (totalPage > 3) {
      pages.push(
        <Button key="ellipsis2" variant="link" size="icon" disabled>
          ...
        </Button>,
      )

      for (let i = totalPage - 2; i < totalPage; i++) {
        pages.push(
          <Button
            key={i}
            variant={query.page === i ? 'secondary' : 'outline'}
            size="icon"
            onClick={() => setSearchParams({ ...query, page: i })}
            disabled={query.page === i}
          >
            {i}
          </Button>,
        )
      }

      pages.push(
        <Button
          key={totalPage}
          variant={query.page === totalPage ? 'secondary' : 'outline'}
          size="icon"
          onClick={() => setSearchParams({ ...query, page: totalPage })}
          disabled={query.page === totalPage}
        >
          {totalPage}
        </Button>,
      )
    }
  }

  // Rest: render 1 ... query.page-1 query.page query.page+1 ... totalPage
  else {
    pages.push(
      <Button key="ellipsis3" variant="link" size="icon" disabled>
        ...
      </Button>,
      <Button
        key={query.page - 1}
        variant="outline"
        size="icon"
        onClick={() => setSearchParams({ ...query, page: query.page - 1 })}
      >
        {query.page - 1}
      </Button>,
      <Button key={query.page} variant="secondary" size="icon" disabled>
        {query.page}
      </Button>,
      <Button
        key={query.page + 1}
        variant="outline"
        size="icon"
        onClick={() => setSearchParams({ ...query, page: query.page + 1 })}
      >
        {query.page + 1}
      </Button>,
      <Button key="ellipsis4" variant="link" size="icon" disabled>
        ...
      </Button>,
      <Button
        key={totalPage}
        variant="outline"
        size="icon"
        onClick={() => setSearchParams({ ...query, page: totalPage })}
      >
        {totalPage}
      </Button>,
    )
  }

  return pages
}
