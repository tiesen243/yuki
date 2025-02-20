'use client'

import React from 'react'
import Form from 'next/form'
import { usePathname, useSearchParams } from 'next/navigation'
import { useFormStatus } from 'react-dom'

import { SearchIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'

export const Search: React.FC<{ className?: string }> = ({ className }) => {
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const category = pathName.startsWith('/shop')
    ? pathName.split('/shop').pop()
    : ''

  const query = searchParams.get('q') ?? ''
  const rest = new URLSearchParams(searchParams)
  rest.delete('page')
  rest.delete('q')

  return (
    <Form
      action={category ? `/shop${category}` : '/shop'}
      className={`relative ${className}`}
    >
      <Input
        type="search"
        name="q"
        placeholder="Search..."
        className="bg-background w-full pr-12 md:bg-transparent"
        defaultValue={query}
      />

      {Array.from(rest).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}

      <SubmitButton />
    </Form>
  )
}

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()

  return (
    <button
      className="ite hover:text-muted-foreground absolute top-0 right-0 z-1 inline-flex h-full min-h-full min-w-10 cursor-pointer items-center justify-center px-4 transition-colors"
      disabled={pending}
    >
      <SearchIcon size={16} />
      <span className="sr-only">search</span>
    </button>
  )
}
