import type { LucideIcon } from 'lucide-react'
import * as React from 'react'

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
    }[]
  } & React.ComponentPropsWithoutRef<typeof SidebarGroup>
> = ({ items, ...props }) => (
  <SidebarGroup {...props}>
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild size="sm">
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
)
