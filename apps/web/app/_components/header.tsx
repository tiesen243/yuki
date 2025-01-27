import Image from 'next/image'
import Link from 'next/link'

import Logo from '@/public/assets/logo.svg'

export const Header: React.FC = () => {
  return (
    <header className="bg-background/70 sticky inset-0 border-b py-2 backdrop-blur-xl">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Image src={Logo} alt="Logo" className="size-8 dark:invert" />
          <span className="sr-only md:not-sr-only">Yuki</span>
        </Link>
      </div>
    </header>
  )
}
