import { Button } from '@yuki/ui/button'
import { DiscordIcon } from '@yuki/ui/icons'

export interface SignInWithDiscordProps {
  searchParams: { redirect: string }
}

export const SignInWithDiscord: React.FC<SignInWithDiscordProps> = ({ searchParams }) => (
  <form action={`/api/auth/discord?redirect=${searchParams.redirect}`} className="w-full">
    <Button variant="outline" className="w-full">
      <DiscordIcon /> Sign in with Discord
    </Button>
  </form>
)
