import { auth } from '@yuki/auth'
import { SessionProvider } from '@yuki/auth/react'

import { Header } from '@/app/(shop)/_components/header'
import { TRPCReactProvider } from '@/lib/trpc/react'

const ShopLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await auth()

  return (
    <TRPCReactProvider>
      <SessionProvider session={session}>
        <Header />
        {children}
      </SessionProvider>
    </TRPCReactProvider>
  )
}

export default ShopLayout
