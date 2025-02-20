import { Link } from 'react-router'

import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { buttonVariants } from '@yuki/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@yuki/ui/dropdown-menu'
import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from '@yuki/ui/icons'
import { useTheme } from '@yuki/ui/utils'

import { useSession } from '@/hooks/use-session'

export const User: React.FC = () => {
  const { session, isLoading, signOut } = useSession()
  const { theme, setTheme } = useTheme()

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

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="grid gap-2">
          <p className="text-sm leading-none font-medium">
            {session.user.name}
          </p>
          <p className="text-muted-foreground text-xs leading-none">
            {session.user.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/dashboard/profile">
            <UserIcon className="mr-2 size-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}
        >
          {theme === 'dark' ? (
            <MoonIcon className="mr-2 size-4" />
          ) : (
            <SunIcon className="mr-2 size-4" />
          )}
          <span>Toggle Theme</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut}>
          <LogOutIcon className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
