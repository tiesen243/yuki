'use client'

import { useSession } from '@yuki/auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'

export const UserProfile: React.FC = () => {
  const { session, status } = useSession()

  if (status === 'authenticated')
    return (
      <div>
        <Avatar className="size-24">
          <AvatarImage src={session.user.image} />
          <AvatarFallback>
            {session.user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    )
}
