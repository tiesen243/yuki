'use client'

import { useState } from 'react'
import Form from 'next/form'
import Image from 'next/image'
import Link from 'next/link'

import { MenuIcon, SearchIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'
import { cn } from '@yuki/ui/utils'

import { Nav } from './nav'

export const MobileMenu: React.FC = () => {
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
          <button className="absolute top-2.5 right-2 cursor-pointer">
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
          <Nav limit={10} isSidebar />
        </nav>
      </aside>
    </>
  )
}

const navLinks = [
  { title: 'Shop', href: '/shop' },
  { title: 'Deals', href: '/deals' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
]
