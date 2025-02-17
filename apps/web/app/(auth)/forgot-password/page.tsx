import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { createMetadata } from '@/lib/metadata'
import { ForgotPasswordForm } from '../_components/forgot-password-form'

export default function ForgotPasswordPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Find Your Account</CardTitle>
        <CardDescription>
          Please enter your email and we&apos;ll send you a link to reset your password
        </CardDescription>
      </CardHeader>

      <ForgotPasswordForm />
    </>
  )
}

export const metadata = createMetadata({
  title: 'Forgotten Password',
  description: 'Reset your account password by entering your email address',
})
