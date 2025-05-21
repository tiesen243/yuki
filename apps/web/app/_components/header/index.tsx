import Image from 'next/image'
import Link from 'next/link'

import { Searchbar } from '@/app/_components/header/search-bar'
import { UserButton } from '@/app/_components/header/user-button'
import { MobileNav } from './mobile-nav'

export const Header: React.FC = () => {
  return (
    <header className="bg-card/70 border-border/50 sticky inset-0 z-50 flex h-16 items-center border-b backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex items-center justify-between gap-4">
        <MobileNav />

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="size-9 dark:invert"
            priority
          />
          <span className="text-foreground sr-only text-2xl font-bold md:not-sr-only">
            Yukinu
          </span>
        </Link>

        <Searchbar className="hidden grow md:flex" />

        <UserButton />
      </div>
    </header>
  )
}
