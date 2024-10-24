'use client'

import { useTheme } from '@yuki/ui'
import { SunIcon } from '@yuki/ui/icons'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@yuki/ui/sidebar'

export const SidebarSettings: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const Icon = theme === 'dark' ? SunIcon : SunIcon

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Settings</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              <Icon />
              <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
