import Image from 'next/image'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@yuki/ui/sidebar'

import { Footer } from '@/app/(dashboard)/_components/app-sidebar/footer'

export const AppSidebar: React.FC = () => (
  <Sidebar>
    <SidebarHeader className="flex-row items-center">
      <Image src="/assets/logo.svg" alt="Yuki" width={32} height={32} className="dark:invert" />
      <span className="text-xl font-bold">Yuki</span>
    </SidebarHeader>

    <SidebarContent></SidebarContent>

    <SidebarFooter>
      <Footer />
    </SidebarFooter>
  </Sidebar>
)
