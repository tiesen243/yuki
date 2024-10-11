import { auth } from '@yuki/auth'
import { SessionProvider } from '@yuki/auth/react'

import { Header } from '@/app/_components/layouts/header'
import { TRPCReactProvider } from '@/lib/trpc/react'

const ShopLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await auth()

  return (
    <TRPCReactProvider>
      <SessionProvider session={session}>
        <Header />
        <main className="container flex-1 py-4">{children}</main>
      </SessionProvider>
    </TRPCReactProvider>
  )
}

export default ShopLayout
