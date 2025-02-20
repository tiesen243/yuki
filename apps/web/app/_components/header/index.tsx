import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { MobileMenu } from './mobile-menu'
import { Search } from './search'
import { User } from './user'

export const Header: React.FC = () => (
  <header className="bg-background/70 sticky inset-0 z-50 flex h-20 items-center border-b shadow-md backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between gap-4">
      <MobileMenu />

      <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={36}
          height={36}
          className="size-9 dark:invert"
        />
        <span className="sr-only md:not-sr-only">Yuki</span>
      </Link>

      <nav className="hidden gap-2 md:flex">
        <Link
          href="/shop"
          className="text-muted-foreground hover:text-foreground"
        >
          Products & Collections
        </Link>
      </nav>

      <Suspense>
        <Search className="hidden grow md:flex" />
      </Suspense>

      <User />
    </div>
  </header>
)
