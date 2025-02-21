import { Separator } from '@yuki/ui/components/separator'
import { SidebarTrigger } from '@yuki/ui/components/sidebar'

import { env } from '@/env'
import { HeaderBreadcrumb } from './breadcrumb'
import { User } from './user'

export const Header: React.FC = () => (
  <header className="bg-background/70 sticky inset-0 z-50 flex h-16 items-center border-b shadow-md backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center gap-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-20 w-20 bg-red-500" />

      <HeaderBreadcrumb />

      <User webUrl={env.WEB_URL} />
    </div>
  </header>
)
