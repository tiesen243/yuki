import { Suspense } from 'react'

import { Card, CardFooter } from '@yuki/ui/card'

import { seo } from '@/lib/seo'
import { SignInWithDiscord } from './_components/signin-with-discord'

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main className="grid min-h-dvh place-items-center">
    <Card className="w-svw max-w-screen-md border-transparent md:border-border">
      {children}

      <div className="mx-6 mb-4 flex items-center gap-2">
        <div className="h-0.5 w-full bg-border" />
        <p className="text-center">or</p>
        <div className="h-0.5 w-full bg-border" />
      </div>

      <CardFooter>
        <Suspense fallback={null}>
          <SignInWithDiscord />
        </Suspense>
      </CardFooter>
    </Card>
  </main>
)

export default AuthLayout

export const metadata = seo({
  title: 'Authentication',
  description: 'Login or register to access your account',
})
