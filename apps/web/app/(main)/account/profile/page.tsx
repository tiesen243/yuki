import { auth } from '@yuki/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Typography } from '@yuki/ui/typography'

import { EditProfileForm, LinkedAccountList } from './page.client'

export default async function ProfilePage() {
  const session = await auth()
  if (!session.user) return

  return (
    <main className="flex-1 rounded-md border py-6 pt-4 shadow-md">
      <div className="container mb-4">
        <Typography variant="h2">Profile</Typography>
        <Typography color="muted">
          Manage your account information to secure your account.
        </Typography>
      </div>

      <hr />

      <section className="container mt-4 grid gap-4 md:grid-cols-2">
        <div className="w-full">
          <Typography>
            <span className="text-muted-foreground">Name:</span>{' '}
            {session.user.name}{' '}
          </Typography>
          <Typography>
            <span className="text-muted-foreground">Role:</span>{' '}
            {session.user.role}
          </Typography>
          <Typography>
            <span className="text-muted-foreground">Email: </span>
            {hideEmail(session.user.email)}
          </Typography>
          <Typography className="text-muted-foreground">
            Linked accounts:
          </Typography>

          <ul className="space-y-2">
            <LinkedAccountList />
          </ul>
        </div>
        <div className="grid place-items-center gap-4">
          <Avatar className="size-40">
            <AvatarImage src={session.user.image} alt={session.user.name} />
            <AvatarFallback>{session.user.name[0]}</AvatarFallback>
          </Avatar>

          <EditProfileForm
            name={session.user.name}
            image={session.user.image}
          />
        </div>
      </section>
    </main>
  )
}

const hideEmail = (email: string) => {
  const [username, domain] = email.split('@')
  if (!username) return 'invalid email'
  const hiddenUsername =
    username.slice(0, 2) + '*'.repeat(username.length - 4) + username.slice(-2)
  return `${hiddenUsername}@${domain}`
}
