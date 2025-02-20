import { Link } from 'react-router'

import { Button } from '@yuki/ui/button'

import type { Route } from './+types/_index'
import { useSession } from '@/hooks/use-session'

export default function HomePage(_: Route.ComponentProps) {
  const { session, isLoading, signOut, isSigningOut } = useSession()

  return (
    <main className="container py-4">
      <pre>{isLoading ? 'Loading...' : JSON.stringify(session, null, 2)}</pre>

      {session?.user ? (
        <Button onClick={signOut} disabled={isSigningOut}>
          Sign out
        </Button>
      ) : (
        <Button asChild>
          <Link to="/sign-in">Sign In</Link>
        </Button>
      )}
    </main>
  )
}
