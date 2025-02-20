import { Typography } from '@yuki/ui/typography'

import { ChangePasswordForm } from './page.client'

export default function ChangePasswordPage() {
  return (
    <main className="flex-1 rounded-md border py-4 shadow-md">
      <div className="container mb-4">
        <Typography variant="h2">Change Password</Typography>
        <Typography color="muted">
          Change your password to secure your account. Make sure to use a strong
          password.
        </Typography>
      </div>

      <hr />

      <ChangePasswordForm />
    </main>
  )
}
