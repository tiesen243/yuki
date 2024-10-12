import { redirect } from 'next/navigation'

import { auth } from '@yuki/auth'
import { SessionProvider } from '@yuki/auth/react'
import { SidebarLayout, SidebarTrigger } from '@yuki/ui/sidebar'
import { ourFileRouter } from '@yuki/uploader'
import { extractRouterConfig, NextSSRPlugin } from '@yuki/uploader/uploadthing'

import { AppSidebar } from '@/app/(dashboard)/_components/app-sidebar/index'

const DashboardLayout: React.FC<Props> = async ({ children, modal }) => {
  const { cookies } = await import('next/headers')

  const session = await auth()
  if (!session) redirect('/sign-in')

  return (
    <SessionProvider session={session}>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

      <SidebarLayout defaultOpen={cookies().get('sidebar:state')?.value === 'true'}>
        <AppSidebar session={session} />
        <main className="flex flex-1 flex-col overflow-x-hidden p-2 transition-all duration-300 ease-in-out">
          <div className="h-full overflow-y-auto rounded-md border-dashed px-4 py-2 md:border-2">
            <SidebarTrigger />
            <section>{children}</section>
          </div>
        </main>
      </SidebarLayout>

      {modal}
    </SessionProvider>
  )
}

export default DashboardLayout

interface Props {
  children: Readonly<React.ReactNode>
  modal: Readonly<React.ReactNode>
}
