import { auth } from '@yuki/auth'
import { Separator } from '@yuki/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@yuki/ui/sidebar'

import { SessionProvider } from '@/lib/auth'
import { seo } from '@/lib/seo'
import { AppSidebar } from './_components/app-sidebar'
import { NavLink } from './_components/nav-link'

export default async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <NavLink />
            </div>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  )
}

export const metadata = seo({
  title: 'Dashboard',
})
