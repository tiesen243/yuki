'use client'

import { useEffect, useState } from 'react'

import { Typography } from '@yuki/ui/typography'
import { cn } from '@yuki/ui/utils'

const categories = [
  { id: 'account', label: 'Account & Registration' },
  { id: 'shopping', label: 'Shopping & Orders' },
  { id: 'payment', label: 'Payment & Pricing' },
  { id: 'shipping', label: 'Shipping & Delivery' },
  { id: 'returns', label: 'Returns & Refunds' },
  { id: 'app', label: 'App Features' },
  { id: 'privacy', label: 'Privacy & Security' },
]

export function FaqCategories() {
  const [activeCategory, setActiveCategory] = useState('account')

  // Update active category based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Find the section that's currently in view
      for (const category of categories) {
        const element = document.getElementById(category.id)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          if (top <= 200 && bottom >= 200) {
            setActiveCategory(category.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for header
        behavior: 'smooth',
      })
      setActiveCategory(categoryId)
    }
  }

  return (
    <div className="hidden md:block">
      <div className="sticky top-24 space-y-1">
        <Typography variant="h5" className="mb-4">
          Categories
        </Typography>
        <nav className="flex flex-col space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                scrollToCategory(category.id)
              }}
              className={cn(
                'hover:bg-muted flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                activeCategory === category.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {category.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
