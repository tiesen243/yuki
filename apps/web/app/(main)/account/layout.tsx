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

const navs = [
  { title: 'Profile', href: '/account/profile' },
  { title: 'Address', href: '/account/address' },
  { title: 'Cart', href: '/account/cart' },
  { title: 'Orders', href: '/account/orders' },
  { title: 'Change Password', href: '/account/change-password' },
]
