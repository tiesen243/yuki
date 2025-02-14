'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { MenuIcon } from '@yuki/ui/icons'
import { cn } from '@yuki/ui/utils'

import { Search } from './search'
import { SidebarThemeToggle } from './theme-toggle'

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

        <Suspense>
          <Search className="mx-2" />
        </Suspense>

        <nav className="mx-2 my-4 flex flex-col gap-1">
          <span className="text-muted-foreground px-2 text-xs">Menu</span>
          {navLinks.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              className="text-foreground hover:bg-background rounded-lg px-2 py-1 transition-colors"
            >
              {title}
            </Link>
          ))}
        </nav>

        <nav className="mx-2 my-4 flex flex-col gap-1">
          <span className="text-muted-foreground px-2 text-xs">Legal</span>
          {legalNavLinks.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              className="text-foreground hover:bg-background rounded-lg px-2 py-1 transition-colors"
            >
              {title}
            </Link>
          ))}
        </nav>

        <nav className="mx-2 my-4 flex flex-col gap-1">
          <span className="text-muted-foreground text-xs">Settings</span>
          <SidebarThemeToggle />
        </nav>
      </aside>
    </>
  )
}

const navLinks = [
  { title: 'Products & Collections', href: '/shop' },
  { title: 'Shopping Cart', href: '/account/cart' },
  { title: 'Purchase History', href: '/account/orders' },
]

const legalNavLinks = [
  { title: 'About', href: '/about' },
  { title: 'Privacy Policy', href: '/privacy' },
  { title: 'Terms & Conditions', href: '/terms' },
  { title: 'Cookie Policy', href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { title: 'Accessibility', href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { title: 'Legal Notice', href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { title: 'Contact Us', href: '/contact' },
]
