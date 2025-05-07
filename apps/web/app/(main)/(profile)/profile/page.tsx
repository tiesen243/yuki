import { Typography } from '@yuki/ui/typography'

import { UserProfile } from './page.client'

export default function ProfilePage() {
  return (
    <main className="container flex flex-1 gap-4 py-4">
      <section className="basis-1/4">
        <h2 className="sr-only">User Avatar section</h2>
        <UserProfile />
      </section>
      <section className="basis-3/4">
        <Typography variant="h2">Account Information</Typography>
      </section>
    </main>
  )
}
