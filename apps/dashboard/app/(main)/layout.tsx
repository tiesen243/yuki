import { SidebarInset, SidebarProvider } from '@yuki/ui/components/sidebar'

import { AppSidebar } from './_compoents/app-sidebar'
import { Footer } from './_compoents/footer'
import { Header } from './_compoents/header'

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
