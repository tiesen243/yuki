import { Card } from '@yuki/ui/card'

import { seo } from '@/lib/seo'

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main className="grid min-h-dvh place-items-center">
    <Card className="w-svw max-w-screen-md border-transparent md:border-border">{children}</Card>
  </main>
)

export default AuthLayout

export const metadata = seo({
  title: 'Authentication',
  description: 'Login or register to access your account',
})
