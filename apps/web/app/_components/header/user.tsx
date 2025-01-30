'use client'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { buttonVariants } from '@yuki/ui/button'

import { useSession } from '@/hooks/use-session'

export const User = () => {
  const { session, isLoading } = useSession()

  if (isLoading) return <div className="size-9 animate-pulse rounded-full" />

  if (!session?.user)
    return (
      <Link href="/sign-in" className={buttonVariants({ size: 'sm' })}>
        Sign in
      </Link>
    )

  return (
    <Link href="/account/profile">
      <Avatar className="ring-ring size-9 hover:ring-2">
        <AvatarImage src={session.user.image} alt={session.user.name} />
        <AvatarFallback>{session.user.name[0]}</AvatarFallback>
      </Avatar>
    </Link>
  )
}
