'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@yuki/ui'
import {
  MapPinHouseIcon,
  ShieldIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@yuki/ui/icons'

export const NavLinks: React.FC = () => {
  const pathName = usePathname()

  return (
    <nav className="flex flex-row gap-2 p-4 md:flex-col">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2 rounded-lg px-2 py-1 font-semibold whitespace-nowrap',
            pathName === item.href ||
              (pathName.startsWith(item.href) && item.href !== '/profile')
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'text-muted-foreground',
          )}
        >
          <item.icon className="size-4" /> {item.name}
        </Link>
      ))}
    </nav>
  )
}

const navItems = [
  {
    name: 'My Account',
    icon: UserIcon,
    href: '/profile',
  },
  {
    name: 'My Addresses',
    icon: MapPinHouseIcon,
    href: '/profile/addresses',
  },
  {
    name: 'My Orders',
    icon: ShoppingBagIcon,
    href: '/profile/orders',
  },
  {
    name: 'My Cart',
    icon: ShoppingCartIcon,
    href: '/profile/cart',
  },
  {
    name: 'Sercurity',
    icon: ShieldIcon,
    href: '/profile/security',
  },
]
