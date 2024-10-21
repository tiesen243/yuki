'use client'

import { useSearchParams } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { DiscordIcon } from '@yuki/ui/icons'

export interface SignInWithDiscordProps {
  searchParams: { redirect: string }
}

export const SignInWithDiscord: React.FC = () => {
  const redirect = useSearchParams().get('redirect')

  return (
    <form action={`/api/auth/discord?redirect=${redirect}`} className="w-full">
      <Button variant="outline" className="w-full">
        <DiscordIcon /> Sign in with Discord
      </Button>
    </form>
  )
}
