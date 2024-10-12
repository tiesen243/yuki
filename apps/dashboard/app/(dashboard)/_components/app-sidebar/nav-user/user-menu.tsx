import Link from 'next/link'
import { BadgeCheck, ShoppingCart } from 'lucide-react'

import { DropdownMenuGroup, DropdownMenuItem } from '@yuki/ui/dropdown-menu'

export const UserMenu: React.FC = () => (
  <DropdownMenuGroup>
    {menuItems.map((item) => (
      <DropdownMenuItem key={item.href} className="gap-2" asChild>
        <Link href={item.href}>
          <item.icon className="h-4 w-4 text-muted-foreground" />
          {item.title}
        </Link>
      </DropdownMenuItem>
    ))}
  </DropdownMenuGroup>
)

const menuItems = [
  {
    title: 'Account',
    href: '/account',
    icon: BadgeCheck,
  },
  {
    title: 'Orders',
    href: '/account/orders',
    icon: ShoppingCart,
  },
]
