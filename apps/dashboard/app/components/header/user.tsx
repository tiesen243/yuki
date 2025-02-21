import { Link } from 'react-router'

import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { buttonVariants } from '@yuki/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@yuki/ui/dropdown-menu'

import { useSession } from '@/hooks/use-session'

export const User: React.FC = () => {
  const { session, isLoading } = useSession()

  if (isLoading)
    return <div className="size-9 animate-pulse rounded-full bg-current" />

  if (!session?.user)
    return (
      <Link to="/sign-in" className={buttonVariants()}>
        Sign In
      </Link>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9">
          <AvatarImage src={session.user.image} />
          <AvatarFallback>{session.user.name.at(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="flex flex-col space-y-1 font-normal">
          <p className="text-sm leading-none font-medium">
            {session.user.name}
          </p>
          <p className="text-muted-foreground text-xs leading-none">
            {session.user.email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
