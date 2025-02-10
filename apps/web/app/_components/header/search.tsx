'use client'

import React from 'react'
import Form from 'next/form'
import { usePathname, useSearchParams } from 'next/navigation'

import { SearchIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'

export const Search: React.FC<{ className?: string }> = ({ className }) => {
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const category = pathName.startsWith('/shop') ? pathName.split('/shop').pop() : ''

  const query = searchParams.get('query') ?? ''
  const rest = new URLSearchParams(searchParams)

  return (
    <Form
      action={category ? `/shop${category}` : '/shop' + `?${rest.toString()}`}
      className={`relative ${className}`}
    >
      <Input
        type="search"
        name="query"
        placeholder="Search..."
        className="w-full pr-12"
        defaultValue={query}
      />
      <button className="ite hover:text-muted-foreground absolute top-0 right-0 z-1 inline-flex h-full min-h-full min-w-10 cursor-pointer items-center justify-center px-4 transition-colors">
        <SearchIcon size={16} />
        <span className="sr-only">search</span>
      </button>
    </Form>
  )
}
