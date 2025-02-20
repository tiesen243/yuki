'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { MenuIcon, StoreIcon } from '@yuki/ui/icons'
import { cn } from '@yuki/ui/utils'

import { useSession } from '@/hooks/use-session'
import { legalNavLinks, navLinks } from './configs'
import { Search } from './search'

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { session } = useSession()

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="bg-transparent md:hidden"
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
      >
        <MenuIcon />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div
        className={cn(
          'bg-background/50 fixed inset-0 z-10 h-dvh w-full backdrop-blur-sm transition-transform',
          isOpen ? 'animate-in block' : 'animate-out hidden',
        )}
        onClick={() => {
          setIsOpen(false)
        }}
      />

      <aside
        className={cn(
          'bg-secondary fixed inset-0 z-20 h-dvh w-2/3 max-w-screen transform border-r transition-transform duration-300',
          isOpen ? 'animate-in translate-x-0' : 'animate-out -translate-x-full',
        )}
      >
        <Link
          href="/"
          className="mx-2 my-4 flex items-center gap-2 text-xl font-bold"
        >
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
          <Link
            href="/shop"
            className="text-foreground hover:bg-background flex items-center gap-2 rounded-lg px-2 py-1 text-sm transition-colors"
          >
            <StoreIcon className="size-4" />
            <span>Products & Collections</span>
          </Link>

          {navLinks
            .slice(0, session?.user ? undefined : 0)
            .map(({ Icon, title, href }) => (
              <Link
                key={title}
                href={href}
                className="text-foreground hover:bg-background flex items-center gap-2 rounded-lg px-2 py-1 text-sm transition-colors"
              >
                <Icon size={16} />
                <span>{title}</span>
              </Link>
            ))}
        </nav>

        <nav className="mx-2 my-4 flex flex-col gap-1">
          <span className="text-muted-foreground px-2 text-xs">Legal</span>
          {legalNavLinks.map(({ Icon, title, href }) => (
            <Link
              key={title}
              href={href}
              className="text-foreground hover:bg-background flex items-center gap-2 rounded-lg px-2 py-1 text-sm transition-colors"
            >
              <Icon className="size-4" />
              <span>{title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
