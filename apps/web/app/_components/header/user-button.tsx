'use client'

import Link from 'next/link'

import { useSession } from '@yuki/auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Button } from '@yuki/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@yuki/ui/dropdown-menu'
import {
  LogOutIcon,
  ShieldIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@yuki/ui/icons'

import { ThemeSwitcher } from '@/app/_components/header/theme-switcher'

export const UserButton: React.FC = () => {
  const { status, session, signOut } = useSession()

  if (status === 'loading')
    return <div className="size-9 animate-pulse rounded-full bg-current" />

  if (status === 'unauthenticated')
    return (
      <Button size="sm" asChild>
        <Link href="/login">Login</Link>
      </Button>
    )

  const { user } = session

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-muted-foreground text-xs">{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {userNavItems.map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <Link href={item.href}>
                <item.icon /> {item.label}
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          ))}

          <ThemeSwitcher />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={signOut}>
            <LogOutIcon /> Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const userNavItems = [
  { href: '/profile', label: 'Profile', icon: UserIcon, shortcut: '⌘P' },
  {
    href: '/profile/cart',
    label: 'Cart',
    icon: ShoppingCartIcon,
    shortcut: '⌘C',
  },
  {
    href: '/profile/orders',
    label: 'Orders',
    icon: ShoppingBagIcon,
    shortcut: '⌘O',
  },
  {
    href: '/profile/security',
    label: 'Security',
    icon: ShieldIcon,
    shortcut: '⌘S',
  },
]
