import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { ResetPasswordForm } from '../../_components/reset-password-form'

export default ({ searchParams }: { searchParams: { token: string; email: string } }) => (
  <>
    <CardHeader>
      <CardTitle>Reset password</CardTitle>
      <CardDescription>Enter your new password below to reset your password</CardDescription>
    </CardHeader>
    <ResetPasswordForm {...searchParams} />
  </>
)
