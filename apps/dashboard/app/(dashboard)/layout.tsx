import { auth } from '@yuki/auth'
import { SessionProvider } from '@yuki/auth/react'
import { SidebarProvider } from '@yuki/ui/sidebar'

import { AppSidebar } from '@/app/(dashboard)/_components/app-sidebar'
import { Header } from '@/app/(dashboard)/_components/header'

const DashboardLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Header />
          <main className="container py-4">{children}</main>
        </div>
      </SidebarProvider>
    </SessionProvider>
  )
}

export default DashboardLayout
