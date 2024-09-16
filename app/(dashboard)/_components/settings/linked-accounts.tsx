import Link from 'next/link'
import { FacebookIcon, GithubIcon } from 'lucide-react'

import { DiscordIcon } from '@/components/discord-icon'
import { Button } from '@/components/ui/button'

import { auth } from '@/server/auth'

export const LinkedAccounts: React.FC = async () => {
  const session = await auth()
  if (!session) return null

  return (
    <ul className="flex flex-col gap-2 pl-8">
      <li className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xl font-semibold">
          <DiscordIcon className="size-5" /> Discord
        </span>

        {session.user.discord ? (
          <Link href="/dashboard/unlink-discord" className="text-lg text-muted-foreground">
            {session.user.discord.username} ({session.user.discord.id})
          </Link>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href="/api/auth/discord">Link now</Link>
          </Button>
        )}
      </li>

      <li className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xl font-semibold">
          <GithubIcon className="size-5" /> GitHub (coming soon)
        </span>

        <Button variant="outline" size="sm" asChild>
          <Link href="https://youtu.be/dQw4w9WgXcQ">Link now</Link>
        </Button>
      </li>

      <li className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xl font-semibold">
          <FacebookIcon className="size-5" /> Facebook (coming soon)
        </span>

        <Button variant="outline" size="sm" asChild>
          <Link href="https://youtu.be/UIp6_0kct_U">Link now</Link>
        </Button>
      </li>
    </ul>
  )
}