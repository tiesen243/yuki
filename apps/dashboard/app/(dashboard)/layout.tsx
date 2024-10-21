import { SidebarProvider } from '@yuki/ui/sidebar'

import { AppSidebar } from './_components/app-sidebar'
import { Header } from './_components/header'

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <SidebarProvider>
    <AppSidebar />
    <div className="w-full">
      <Header />
      <main className="container py-4">{children}</main>
    </div>
  </SidebarProvider>
)

export default DashboardLayout
