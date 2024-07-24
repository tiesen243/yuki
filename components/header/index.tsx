import Image from 'next/image'
import Link from 'next/link'

import { Auth } from './auth'

export const Header: React.FC = () => (
  <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={28} height={28} className="dark:invert" />
        <span className="sr-only text-xl font-bold md:not-sr-only">Yuki</span>
      </Link>

      <Auth />
    </div>
  </header>
)