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
        className="w-full pr-8"
        defaultValue={query}
      />
      <button className="absolute top-2.5 right-2 z-[4] cursor-pointer">
        <SearchIcon size={16} />
      </button>
    </Form>
  )
}
