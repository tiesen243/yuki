import { SidebarTrigger } from '@yuki/ui/sidebar'

import { Breadcrumb } from './breadcrumb'

export const Header: React.FC = () => (
  <header className="inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center gap-4">
      <SidebarTrigger />
      <Breadcrumb />
    </div>
  </header>
)
