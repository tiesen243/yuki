'use client'

import Link from 'next/link'

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
import { LogOutIcon, MoonIcon, SunIcon } from '@yuki/ui/icons'
import { useTheme } from '@yuki/ui/utils'

import { useSession } from '@/hooks/use-session'
import { navLinks } from './configs'

export const User: React.FC = () => {
  const { session, isLoading, signOut } = useSession()
  const { theme, setTheme } = useTheme()

  if (isLoading) return <div className="size-9 animate-pulse rounded-full bg-current" />

  if (!session?.user)
    return (
      <Link href="/sign-in" className={buttonVariants({ size: 'sm' })}>
        Sign in
      </Link>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 cursor-pointer">
          <AvatarImage src={session.user.image} alt={session.user.name} />
          <AvatarFallback>{session.user.name[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <AlertDialog>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="flex flex-col space-y-1 font-normal">
            <p className="text-sm leading-none font-medium">{session.user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {session.user.email}
            </p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {navLinks.map(({ Icon, title, href, shortcut }) => (
              <DropdownMenuItem key={href} asChild>
                <Link href={href}>
                  <Icon className="mr-2 size-4" />
                  <span>{title}</span>
                  <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuItem
              onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light')
              }}
            >
              {theme === 'dark' ? (
                <SunIcon className="mr-2 size-4" />
              ) : (
                <MoonIcon className="mr-2 size-4" />
              )}
              <span>Toggle Theme</span>
              <DropdownMenuShortcut>⇧⌘T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>

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
    </DropdownMenu>
  )
}
