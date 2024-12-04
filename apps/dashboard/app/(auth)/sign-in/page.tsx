import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { SignInForm } from '../_components/sign-in-form'

export default () => (
  <>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Enter your email below to login to your account</CardDescription>
    </CardHeader>
    <SignInForm />
  </>
)
