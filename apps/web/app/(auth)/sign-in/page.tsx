import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { createMetadata } from '@/lib/metadata'
import { SignInForm } from './page.client'

export default function SignInPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <SignInForm />
    </>
  )
}

export const metadata = createMetadata({
  title: 'Sign In',
  description: 'Sign in to your account',
})
