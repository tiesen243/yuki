import { auth, signOut } from '@yuki/auth'
import { Button } from '@yuki/ui/button'
import { DiscordIcon, GithubIcon } from '@yuki/ui/icons'
import { Typography } from '@yuki/ui/typography'

export async function AuthShowcase() {
  const session = await auth()

  if (!session.user) {
    return (
      <form className="mb-4 flex flex-col gap-4">
        <Button size="lg" formAction={'/api/auth/discord'}>
          <DiscordIcon /> Sign in with Discord
        </Button>

        <Button size="lg" formAction={'/api/auth/github'}>
          <GithubIcon /> Sign in with GitHub
        </Button>
      </form>
    )
  }

  return (
    <div className="mb-4 flex flex-col items-center justify-center gap-4">
      <Typography className="text-xl">Logged in as {session.user.name}</Typography>

      <form action={signOut}>
        <Button>Sign out</Button>
      </form>
    </div>
  )
}
