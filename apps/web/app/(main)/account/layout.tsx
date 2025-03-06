import { redirect } from 'next/navigation'

import { auth } from '@yuki/auth'

import { createMetadata } from '@/lib/metadata'
import { NavLink } from './layout.client'

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container flex grow flex-col gap-4 py-4 md:flex-row">
      <aside className="md:w-1/6">
        <nav className="flex gap-2 md:flex-col">
          {navs.map((nav) => (
            <NavLink key={nav.href} href={nav.href}>
              {nav.title}
            </NavLink>
          ))}
        </nav>
      </aside>
      {children}
    </div>
  )
}

export const generateMetadata = async () => {
  const session = await auth()
  if (!session.user) redirect('/sign-in')

  return createMetadata({
    title: session.user.name,
    description: 'Manage your account information to secure your account.',
  })
}

const navs = [
  { title: 'Profile', href: '/account/profile' },
  { title: 'Address', href: '/account/address' },
  { title: 'Cart', href: '/account/cart' },
  { title: 'Orders', href: '/account/orders' },
  { title: 'Change Password', href: '/account/change-password' },
]
