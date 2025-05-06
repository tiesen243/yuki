import Image from 'next/image'
import Link from 'next/link'

import { UserButton } from '../../user-button'

export const Header: React.FC = () => (
  <header className="bg-sidebar/95 supports-[backdrop-filter]:bg-sidebar/60 sticky inset-0 z-50 flex h-16 items-center border-b drop-shadow-md backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={36}
          height={36}
          className="size-9 dark:invert"
          priority
        />
        <span className="text-foreground text-2xl font-bold">Yuki</span>
      </Link>
      <UserButton />
    </div>
  </header>
)
