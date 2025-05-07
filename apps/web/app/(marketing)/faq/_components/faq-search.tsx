'use client'

import type React from 'react'
import { useState } from 'react'

import { Button } from '@yuki/ui/button'
import { SearchIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'
import { Typography } from '@yuki/ui/typography'

export function FaqSearch() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would filter the FAQs or redirect to search results
    console.log('Searching for:', searchQuery)

    // Scroll to relevant sections based on search
    if (searchQuery.toLowerCase().includes('return')) {
      document.getElementById('returns')?.scrollIntoView({ behavior: 'smooth' })
    } else if (searchQuery.toLowerCase().includes('payment')) {
      document.getElementById('payment')?.scrollIntoView({ behavior: 'smooth' })
    }
    // Add more keyword-based scrolling as needed
  }

  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm">
      <Typography variant="h4" className="mb-4">
        Find answers quickly
      </Typography>
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search for answers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>
      {searchQuery && (
        <div className="mt-4">
          <Typography variant="p" color="muted" className="text-sm">
            Popular searches: returns, shipping, payment methods, order tracking
          </Typography>
        </div>
      )}
    </div>
  )
}
