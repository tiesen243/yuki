import { Link } from 'react-router'
import { LogOutIcon, MoonIcon, SunIcon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@yuki/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { buttonVariants } from '@yuki/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@yuki/ui/dropdown-menu'
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
    <AlertDialog>
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

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }}
            >
              {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
              <span>Toggle Theme</span>
              <DropdownMenuShortcut>⇧⌘T</DropdownMenuShortcut>
            </DropdownMenuItem>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <LogOutIcon />
                <span>Sign Out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={signOut}>Log Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
