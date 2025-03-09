'use client'

import Form from 'next/form'
import { useQueryStates } from 'nuqs'

import { SearchIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'

import { shopSearchParsers } from '@/lib/search'

export const Search: React.FC<{ className?: string }> = ({ className }) => {
  const [query, setQuery] = useQueryStates(shopSearchParsers)

  return (
    <Form action="/shop" className={`relative ${className}`}>
      <Input
        type="search"
        name="q"
        placeholder="Search..."
        value={query.q}
        onChange={(e) => setQuery({ q: e.target.value })}
        className="bg-background w-full pr-12 md:bg-transparent"
      />

      <button className="ite hover:text-muted-foreground absolute top-0 right-0 z-1 inline-flex h-full min-h-full min-w-10 cursor-pointer items-center justify-center px-4 transition-colors">
        <SearchIcon size={16} />
        <span className="sr-only">search</span>
      </button>
    </Form>
  )
}
