import { auth } from '@yuki/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Button } from '@yuki/ui/button'

import { getBaseUrl, getDashboardUrl } from '@/lib/utils'

export const User: React.FC = async () => {
  const session = await auth()

  if (!session)
    return (
      <Button variant="outline" asChild>
        <a href={`${getDashboardUrl()}/sign-in?redirect=${getBaseUrl()}`}>Sign In</a>
      </Button>
    )

  return (
    <a href={`${getDashboardUrl()}/account`}>
      <Avatar className="ring-2 hover:ring-ring">
        <AvatarImage
          src={session.user.avatar ?? session.user.discord?.avatar}
          alt={session.user.name}
        />
        <AvatarFallback>{session.user.name}</AvatarFallback>
      </Avatar>
    </a>
  )
}
