import Link from 'next/link'

import { logOut } from '@yuki/auth'
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from '@yuki/ui/dropdown-menu'
import { LogOutIcon } from '@yuki/ui/icons'

export const UserMenu: React.FC<{ items: UserMenuItem[] }> = ({ items }) => (
  <DropdownMenuGroup>
    {items.map((item) => (
      <DropdownMenuItem key={item.url} className="gap-2" asChild>
        <Link href={item.url}>
          <item.icon className="h-4 w-4 text-muted-foreground" />
          {item.title}
        </Link>
      </DropdownMenuItem>
    ))}

    <DropdownMenuSeparator />

    <DropdownMenuItem className="gap-2" onClick={() => logOut()}>
      <LogOutIcon className="h-4 w-4 text-muted-foreground" />
      Sign out
    </DropdownMenuItem>
  </DropdownMenuGroup>
)

interface UserMenuItem {
  title: string
  url: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}