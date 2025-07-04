import Image from 'next/image'
import Link from 'next/link'

import { Search } from './search'
import { UserButton } from './user-button'

export function Header() {
  return (
    <header className="bg-background/70 sticky inset-0 z-50 flex flex-col justify-center gap-4 border-b py-4 backdrop-blur-xl backdrop-saturate-150 md:h-16">
      <Link href="/" className="flex justify-center gap-2 md:hidden">
        <Image
          src="/assets/logo.svg"
          alt="yukinu-logo"
          width={32}
          height={32}
          className="size-6 object-cover dark:invert"
        />
        <span className="text-xl font-bold">Yukinu</span>
      </Link>

      <div className="container flex items-center justify-between gap-4">
        <Link href="/" className="hidden items-center gap-2 md:flex">
          <Image
            src="/assets/logo.svg"
            alt="yukinu-logo"
            width={32}
            height={32}
            className="size-8 object-cover dark:invert"
          />
          <span className="text-xl font-bold">Yukinu</span>
        </Link>

        <Search />

        <UserButton />
      </div>
    </header>
  )
}
