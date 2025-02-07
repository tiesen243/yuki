import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@yuki/auth'

export default async function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  if (!session.user) redirect('/sign-in')

  return (
    <div className="container flex grow flex-col gap-4 py-4 md:flex-row">
      <aside className="md:w-1/6">
        <nav className="*:text-muted-foreground *:hover:text-foreground flex gap-2 md:flex-col">
          {navs.map((nav) => (
            <Link key={nav.href} href={nav.href}>
              {nav.title}
            </Link>
          ))}
        </nav>
      </aside>
      {children}
    </div>
  )
}

const navs = [
  { title: 'Profile', href: '/account/profile' },
  { title: 'Address', href: '/account/address' },
  { title: 'Cart', href: '/account/cart' },
  { title: 'Orders', href: '/account/orders' },
  { title: 'Change Password', href: '/account/change-password' },
]
