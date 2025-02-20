import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { createMetadata } from '@/lib/metadata'
import { SignUpForm } from './page.client'

export default function SignInPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up for a new account</CardDescription>
      </CardHeader>

      <SignUpForm />
    </>
  )
}

export const metadata = createMetadata({
  title: 'Sign Up',
  description: 'Sign up for a new account',
})
