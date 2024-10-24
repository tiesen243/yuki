import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from '@yuki/ui/sidebar'

import { ThemeSetting } from './theme-setting'

export const SidebarSettings: React.FC = () => (
  <SidebarGroup>
    <SidebarGroupLabel>Settings</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <ThemeSetting />
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
)
