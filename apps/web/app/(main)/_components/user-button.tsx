'use client'

import Link from 'next/link'

import { useSession } from '@yuki/auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Button } from '@yuki/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@yuki/ui/dropdown-menu'
import {
  CheckIcon,
  LaptopIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from '@yuki/ui/icons'
import { useTheme } from '@yuki/ui/utils'

export const UserButton: React.FC = () => {
  const { session, status, signOut } = useSession()
  const { theme, setTheme } = useTheme()

  if (status === 'unauthenticated')
    return (
      <Button asChild>
        <Link href="/login">Sign In</Link>
      </Button>
    )
  else if (status === 'loading' || !session.user)
    return <div className="size-9 animate-pulse rounded-full bg-current" />
  else
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="hover:ring-ring size-9 hover:ring-2">
            <AvatarImage src={session.user.image} />
            <AvatarFallback>
              {session.user.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="min-w-56" align="end" forceMount>
          <DropdownMenuLabel className="grid gap-1 font-normal">
            <p className="text-sm leading-none font-medium">
              {session.user.name}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {session.user.email}
            </p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {userNavs.map(({ href, label, icon: Icon, shortcut }) => (
              <DropdownMenuItem key={href} asChild>
                <Link href={href}>
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{label}</span>
                  <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <SunIcon className="mr-2 h-4 w-4" />
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme('light')
                  }}
                >
                  <SunIcon className="mr-2 h-4 w-4" />
                  <span>Light</span>
                  {theme === 'light' && (
                    <CheckIcon className="ml-auto h-4 w-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme('dark')
                  }}
                >
                  <MoonIcon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                  {theme === 'dark' && (
                    <CheckIcon className="ml-auto h-4 w-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTheme('system')
                  }}
                >
                  <LaptopIcon className="mr-2 h-4 w-4" />
                  <span>System</span>
                  {theme === 'system' && (
                    <CheckIcon className="ml-auto h-4 w-4" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Sign out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}

const userNavs = [
  { label: 'Profile', icon: UserIcon, shortcut: '⇧⌘P', href: '#profile' },
  { label: 'Settings', icon: SettingsIcon, shortcut: '⌘S', href: '#settings' },
]
