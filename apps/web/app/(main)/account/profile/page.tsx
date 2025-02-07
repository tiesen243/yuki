import { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@yuki/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Button } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

import { api, HydrateClient } from '@/lib/trpc/server'
import { LinkedAccountList, LinkedAccountSkeleton, SignOutButton } from './page.client'

export default async function ProfilePage() {
  const [session] = await Promise.all([auth(), api.user.getLinkedAccounts.prefetch()])
  if (!session.user) redirect('/sign-in')

  return (
    <HydrateClient>
      <main className="bg-secondary flex-1 rounded py-6 pt-4 shadow-md">
        <div className="container mb-4">
          <Typography level="h2">Profile</Typography>
          <Typography color="muted">
            Manage your account information to secure your account.
          </Typography>
        </div>

        <hr className="border-primary/20" />

        <section className="container mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Typography>
              <span className="text-muted-foreground">Name:</span> {session.user.name}{' '}
            </Typography>
            <Typography>
              <span className="text-muted-foreground">Role:</span> {session.user.role}
            </Typography>
            <Typography>
              <span className="text-muted-foreground">Email: </span>
              {hideEmail(session.user.email)}
            </Typography>
            <Typography className="text-muted-foreground">Linked accounts:</Typography>

            <ul className="space-y-2">
              <Suspense fallback={<LinkedAccountSkeleton />}>
                <LinkedAccountList />
              </Suspense>
            </ul>
          </div>
          <div className="grid place-items-center gap-4">
            <Avatar className="size-40">
              <AvatarImage src={session.user.image} alt={session.user.name} />
              <AvatarFallback>{session.user.name[0]}</AvatarFallback>
            </Avatar>
            <Button>Edit profile</Button>
            <SignOutButton />
          </div>
        </section>
      </main>
    </HydrateClient>
  )
}

const hideEmail = (email: string) => {
  const [username, domain] = email.split('@')
  if (!username) return 'invalid email'
  const hiddenUsername = username.slice(0, 2) + '*'.repeat(username.length - 2)
  return `${hiddenUsername}@${domain}`
}
