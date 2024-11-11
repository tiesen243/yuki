import { Separator } from '@yuki/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@yuki/ui/sidebar'

import { AppSidebar } from './_components/app-sidebar'
import { BreadCrumb } from './_components/breadcrumb'

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <header className="sticky inset-0 flex shrink-0 items-center gap-2 border-b py-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <BreadCrumb />
        </div>
      </header>

      <main className="container py-4">{children}</main>
    </SidebarInset>
  </SidebarProvider>
)

export default DashboardLayout
