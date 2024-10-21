import Image from 'next/image'

import { Sidebar, SidebarHeader } from '@yuki/ui/sidebar'

export const AppSidebar: React.FC = () => (
  <Sidebar>
    <SidebarHeader className="flex-row items-center">
      <Image src="/assets/logo.svg" alt="Yuki" width={32} height={32} className="dark:invert" />
      <span className="text-xl font-bold">Yuki</span>
    </SidebarHeader>
  </Sidebar>
)
