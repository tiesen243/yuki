import { Outlet } from 'react-router'

import { Button } from '@yuki/ui/button'
import { Card, CardFooter } from '@yuki/ui/card'
import { FacebookIcon, GoogleIcon } from '@yuki/ui/icons'

export default function AuthLayout() {
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
            <Button variant="outline" formAction="/api/auth/facebook">
              <FacebookIcon />
              <span className="xs:not-sr-only sr-only">Facebook</span>
            </Button>
            <Button variant="outline" formAction="/api/auth/google">
              <GoogleIcon />
              <span className="xs:not-sr-only sr-only">Google</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  )
}
