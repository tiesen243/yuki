'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'

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

import { useSession } from '@/hooks/use-session'
import { navLinks } from './configs'

export const User: React.FC = () => {
  const { session, isLoading } = useSession()
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

        <DropdownMenuItem asChild>
          <Link href="/api/auth/sign-out">
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
