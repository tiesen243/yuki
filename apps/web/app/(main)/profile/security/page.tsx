import { Typography } from '@yuki/ui/typography'

import { ChangePasswordForm, DeleteAccountButton } from './page.client'

export default function ProfilePage() {
  return (
    <section>
      <h2 className="sr-only">Profile Security Section</h2>

      <section className="mb-8">
        <Typography variant="h3">Change Password</Typography>
        <Typography color="muted" className="mb-4 text-sm">
          Ensure your account remains secure by updating your password
          regularly.
        </Typography>

        <ChangePasswordForm />
      </section>

      <section>
        <Typography variant="h3" color="destructive">
          Delete Account
        </Typography>
        <Typography color="muted" className="text-sm">
          This action is irreversible. Please proceed with caution.
        </Typography>

        <DeleteAccountButton />
      </section>
    </section>
  )
}
