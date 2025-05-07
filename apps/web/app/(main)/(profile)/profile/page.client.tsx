'use client'

import { useSession } from '@yuki/auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Typography } from '@yuki/ui/typography'

export const UserProfile: React.FC = () => {
  const { session, status } = useSession()

  if (status === 'authenticated')
    return (
      <div className="grid place-items-center gap-4">
        <Avatar className="size-48">
          <AvatarImage src={session.user.image} />
          <AvatarFallback>
            {session.user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <Typography variant="h3">{session.user.name}</Typography>

        <Typography variant="h4" className="text-muted-foreground">
          Joined {new Date(session.user.createdAt).toLocaleDateString()}
        </Typography>
      </div>
    )
}
