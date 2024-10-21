'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { DiscordIcon } from '@yuki/ui/icons'

export interface SignInWithDiscordProps {
  searchParams: { redirect: string }
}

export const SignInWithDiscord: React.FC = () => {
  const router = useRouter()
  const redirect = useSearchParams().get('redirect')

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => router.push(`/api/auth/discord?redirect=${redirect}`)}
    >
      <DiscordIcon /> Sign in with Discord
    </Button>
  )
}
