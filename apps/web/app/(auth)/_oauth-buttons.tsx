'use client'

import { useQueryStates } from 'nuqs'

import { Button } from '@yuki/ui/button'
import { CardFooter } from '@yuki/ui/card'
import { FacebookIcon, GoogleIcon } from '@yuki/ui/icons'

import { redirect } from './_search-params'

export const OauthButtons: React.FC = () => {
  const [{ redirectTo }] = useQueryStates(redirect.parsers, redirect.configs)

  return (
    <CardFooter className="grid gap-2">
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>

      <form className="grid grid-cols-2 gap-4">
        <input type="hidden" name="redirect_to" value={redirectTo} />

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
  )
}
