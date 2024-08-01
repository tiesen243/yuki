import { Sidebar } from '@/components/side-bar'
import { SessionProvider } from '@/lib/session'
import { auth } from '@/server/auth'

export const metadata = {
  title: 'Dashboard',
}

const DashboardLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const { user, session } = await auth()

  return (
    <SessionProvider user={user} session={session}>
      <div className="hidden h-screen grid-cols-12 gap-4 md:grid">
        <Sidebar />

        <main className="container col-span-10 my-4 max-h-full overflow-y-auto">{children}</main>
      </div>

      <div className="container grid h-screen place-items-center md:hidden">
        <p className="text-xl font-bold">Please use a larger screen to view this page.</p>
      </div>
    </SessionProvider>
  )
}

export default DashboardLayout