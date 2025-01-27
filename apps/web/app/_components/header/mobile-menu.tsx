'use client'

import { useState } from 'react'
import Form from 'next/form'
import Image from 'next/image'
import Link from 'next/link'

import type { Category } from '@yuki/db'
import { MenuIcon, SearchIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'
import { cn } from '@yuki/ui/utils'

import { slugify } from '@/lib/utils'

export const MobileMenu: React.FC<{
  navLinks: { title: string; href: string }[]
}> = ({ navLinks }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <MenuIcon
        className="cursor-pointer md:hidden"
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
      />

      <div
        className={cn(
          'bg-background/50 fixed inset-0 z-10 h-dvh w-full transform backdrop-blur-sm',
          isOpen ? 'block' : 'hidden',
        )}
        onClick={() => {
          setIsOpen(false)
        }}
      />

      <aside
        className={cn(
          'bg-secondary fixed inset-0 z-20 h-dvh w-1/2 max-w-screen transform border-r transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Link href="/" className="mx-2 my-4 flex items-center gap-2 text-xl font-bold">
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={36}
            height={36}
            className="size-9 dark:invert"
          />

          <span>Yuki</span>
        </Link>

        <Form action="/shop" className="relative mx-2">
          <Input
            type="search"
            name="q"
            placeholder="Search..."
            className="bg-background w-full pr-8"
          />
          <button className="absolute top-2 right-2 z-[4] cursor-pointer">
            <SearchIcon size={16} />
          </button>
        </Form>

        <nav className="mx-2 my-4 flex flex-col gap-1">
          <span className="text-muted-foreground px-2 text-xs">Menu</span>
          {navLinks.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              className="text-foreground hover:bg-background/40 rounded-lg px-2 py-1 transition-colors"
            >
              {title}
            </Link>
          ))}
        </nav>

        <nav className="mx-2 my-4 flex flex-col gap-1">
          <span className="text-muted-foreground text-xs">Categories</span>
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${slugify(category.name)}-${category.id}`}
              className="text-foreground hover:bg-background/40 rounded-lg px-2 py-1 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}

const mockCategories: Category[] = [
  { id: '1', name: 'Category 1' },
  { id: '2', name: 'Category 2' },
  { id: '3', name: 'Category 3' },
  { id: '4', name: 'Category 4' },
  { id: '5', name: 'Category 5' },
  { id: '6', name: 'Category 6' },
  { id: '7', name: 'Category 7' },
  { id: '8', name: 'Category 8' },
  { id: '9', name: 'Category 9' },
  { id: '10', name: 'Category 10' },
]
