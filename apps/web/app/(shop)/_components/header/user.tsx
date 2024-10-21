import { auth } from '@yuki/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { buttonVariants } from '@yuki/ui/button'

import { getBaseUrl, getDashboardUrl } from '@/lib/utils'

export const User: React.FC = async () => {
  const session = await auth()
  if (!session)
    return (
      <a
        className={buttonVariants({ variant: 'outline' })}
        href={`${getDashboardUrl()}/sign-in?redirect=${getBaseUrl()}`}
      >
        Login
      </a>
    )

  return (
    <Avatar className="size-8 ring-2 hover:ring-ring" asChild>
      <a href={getDashboardUrl()}>
        <AvatarImage
          src={session.user.avatar ?? session.user.discord?.avatar}
          alt={session.user.name}
        />
        <AvatarFallback>{session.user.name.slice(0, 2)}</AvatarFallback>
      </a>
    </Avatar>
  )
}
