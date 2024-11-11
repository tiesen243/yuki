import { redirect } from 'next/navigation'

import { auth } from '@yuki/auth'

const AuthLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await auth()
  if (!session) redirect('/')

  return <main className="grid min-h-dvh place-items-center">{children}</main>
}

export default AuthLayout
