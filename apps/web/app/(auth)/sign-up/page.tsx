import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { createMetadata } from '@/lib/metadata'
import { SignUpForm } from '../_components/sign-up-form'

export default function SignInPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <SignUpForm />
    </>
  )
}

export const metadata = createMetadata({
  title: 'Sign Up',
  description: 'Sign up for a new account',
})
