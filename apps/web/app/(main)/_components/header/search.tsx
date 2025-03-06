'use client'

import React from 'react'
import Form from 'next/form'
import { useFormStatus } from 'react-dom'

import { SearchIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'

export const Search: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Form action="/shop" className={`relative ${className}`}>
      <Input
        type="search"
        name="q"
        placeholder="Search..."
        className="bg-background w-full pr-12 md:bg-transparent"
      />

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
