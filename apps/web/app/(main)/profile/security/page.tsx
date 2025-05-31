import { Typography } from '@yuki/ui/typography'

import { ChangePasswordForm, DeleteAccountButton } from './page.client'

export default function ProfilePage() {
  return (
    <>
      <section className="mb-8">
        <Typography variant="h4" component="h2">
          Change Password
        </Typography>
        <Typography className="text-muted-foreground mb-4 text-sm">
          Ensure your account remains secure by updating your password
          regularly.
        </Typography>

        <ChangePasswordForm />
      </section>

      <section>
        <Typography variant="h4" component="h2" className="text-error">
          Delete Account
        </Typography>
        <Typography className="text-muted-foreground text-sm">
          This action is irreversible. Please proceed with caution.
        </Typography>

        <DeleteAccountButton />
      </section>
    </>
  )
}
