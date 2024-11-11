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
import { ChangeTheme } from './change-theme'

export const NavSettings: React.FC<{ navSettings: SidebarContent['navSettings'] }> = ({
  navSettings,
}) => (
  <SidebarGroup>
    <SidebarGroupLabel>{navSettings.title}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        {navSettings.items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}

        <ChangeTheme />
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
)
