import Link from 'next/link'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@yuki/ui/sidebar'

import type { SidebarContent } from '@/app/(dashboard)/_components/app-sidebar/content'

export const NavMain: React.FC<{ navMain: SidebarContent['navMain'] }> = ({ navMain }) =>
  navMain.map((item) => (
    <SidebarGroup key={item.title}>
      <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {item.items.map((subItem) => (
            <SidebarMenuItem key={subItem.title}>
              <SidebarMenuButton asChild>
                <Link href={subItem.url}>
                  <subItem.icon />
                  <span>{subItem.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ))
