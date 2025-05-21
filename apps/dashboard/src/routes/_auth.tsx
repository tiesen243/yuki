import { Outlet } from 'react-router'

import { useSession } from '@yuki/auth/react'
import { Button } from '@yuki/ui/button'
import { Card, CardFooter } from '@yuki/ui/card'
import { FacebookIcon, GoogleIcon } from '@yuki/ui/icons'

export default function AuthLayout() {
  const { signIn } = useSession()

  return (
    <main className="container grid min-h-dvh place-items-center">
      <Card className="w-full max-w-md">
        <Outlet />

        <CardFooter className="grid gap-2">
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>

          <form className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => signIn('facebook')}>
              <FacebookIcon /> Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signIn('google')}
            >
              <GoogleIcon /> Google
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  )
}
