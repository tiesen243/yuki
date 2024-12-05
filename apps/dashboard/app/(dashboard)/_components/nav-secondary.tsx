import type { LucideIcon } from 'lucide-react'
import * as React from 'react'
import Link from 'next/link'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@yuki/ui/sidebar'

export const NavSecondary: React.FC<
  {
    items: {
      title: string
      url: string
      icon: LucideIcon
      isExternal?: boolean
    }[]
  } & React.ComponentPropsWithoutRef<typeof SidebarGroup>
> = ({ items, ...props }) => (
  <SidebarGroup {...props}>
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild size="sm">
              <Link
                href={item.url}
                {...(item.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
)
