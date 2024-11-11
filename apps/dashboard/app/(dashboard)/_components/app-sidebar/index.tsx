import Image from 'next/image'
import Link from 'next/link'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@yuki/ui/sidebar'

import { sidebarContent } from '@/app/(dashboard)/_components/app-sidebar/content'
import { NavMain } from '@/app/(dashboard)/_components/app-sidebar/nav-main'
import { NavSettings } from '@/app/(dashboard)/_components/app-sidebar/nav-settings'
import { NavUser } from '@/app/(dashboard)/_components/app-sidebar/nav-user'
import { getClientUrl } from '@/lib/utils'

export const AppSidebar: React.FC = () => (
  <Sidebar>
    <SidebarHeader>
      <Link href="/" className="flex items-center gap-4">
        <Image
          src={`${getClientUrl()}/assets/logo.svg`}
          width={40}
          height={40}
          alt="logo"
          className="dark:invert"
        />
        <span className="text-4xl font-bold">Yuki</span>
      </Link>
    </SidebarHeader>

    <SidebarContent>
      <NavMain navMain={sidebarContent.navMain} />
      <NavSettings navSettings={sidebarContent.navSettings} />
    </SidebarContent>

    <SidebarFooter>
      <NavUser />
    </SidebarFooter>
  </Sidebar>
)
