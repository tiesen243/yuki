import Form from 'next/form'
import Image from 'next/image'
import Link from 'next/link'

import { SearchIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'

import { MobileMenu } from './mobile-menu'
import { ThemeBtn } from './theme-btn'
import { User } from './user'

export const Header: React.FC = () => (
  <header className="bg-background/70 sticky inset-0 z-50 border-b py-4 shadow-md backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between gap-4">
      <MobileMenu navLinks={navLinks} />

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

      <nav className="hidden md:flex">
        <ul className="flex gap-2">
          {navLinks.map(({ title, href }) => (
            <li key={title} className="text-muted-foreground hover:text-foreground">
              <Link href={href}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Form action="/shop" className="relative hidden grow md:flex">
        <Input type="search" name="q" placeholder="Search..." className="w-full pr-8" />
        <button className="absolute top-2.5 right-2 z-[4] cursor-pointer">
          <SearchIcon size={16} />
        </button>
      </Form>

      <div className="flex items-center gap-4">
        <User />
        <ThemeBtn />
      </div>
    </div>
  </header>
)

const navLinks = [
  { title: 'Shop', href: '/shop' },
  { title: 'Deals', href: '/deals' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
]
