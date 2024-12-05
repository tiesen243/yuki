import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from '@yuki/ui/sidebar'

import { content } from './content'
import { NavMain } from './nav-main'
import { NavSecondary } from './nav-secondary'
import { NavUser } from './nav-user'

export const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => (
  <Sidebar collapsible="icon" {...props}>
    <SidebarContent>
      <NavMain title="User" items={content.user} />
      <NavMain title="Admin" items={content.admin} />
      <NavSecondary items={content.navSecondary} className="mt-auto" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
)
