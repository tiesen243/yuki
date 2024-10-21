'use client'

import { useSession } from '@yuki/auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@yuki/ui/dropdown-menu'
import { ShieldIcon, ShoppingCart, UserIcon } from '@yuki/ui/icons'

import { SignoutBtn } from './signout-btn'
import { UserCard } from './user-card'
import { UserMenu } from './user-menu'

export const Footer: React.FC = () => {
  const session = useSession()
  if (!session) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full rounded-md outline-none ring-ring hover:bg-accent focus-visible:ring-2 data-[state=open]:bg-accent">
        <UserCard user={session.user} icon />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" side="right" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <UserCard user={session.user} />
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <UserMenu
          items={[
            { title: 'Profile', url: '/account', icon: UserIcon },
            { title: 'Orders', url: '/account/orders', icon: ShoppingCart },
            { title: 'Security', url: '/account/security', icon: ShieldIcon },
          ]}
        />

        <DropdownMenuSeparator />

        <SignoutBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
