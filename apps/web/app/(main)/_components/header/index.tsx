import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { env } from '@/env'
import { Search } from './search'
import { User } from './user'

export const Header: React.FC = () => (
  <header className="bg-background/70 sticky inset-0 z-50 flex h-16 items-center border-b shadow-md backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
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
        <Search className="hidden grow md:flex" />
      </Suspense>

      <User dashboardUrl={env.DASHBOARD_URL} />
    </div>
  </header>
)
