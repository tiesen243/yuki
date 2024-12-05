import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { ForgotPasswordForm } from '../_components/forgot-password-form'

export default () => (
  <>
    <CardHeader>
      <CardTitle>Forgot password</CardTitle>
      <CardDescription>
        Enter your user account's verified email address and we will send you a password reset link.
      </CardDescription>
    </CardHeader>
    <ForgotPasswordForm />
  </>
)
