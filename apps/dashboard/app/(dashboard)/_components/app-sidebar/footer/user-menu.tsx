import Link from 'next/link'

import { DropdownMenuGroup, DropdownMenuItem } from '@yuki/ui/dropdown-menu'

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
  </DropdownMenuGroup>
)

interface UserMenuItem {
  title: string
  url: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}
