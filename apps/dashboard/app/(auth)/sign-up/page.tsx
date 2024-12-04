import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { SignUpForm } from '../_components/sign-up-form'

export default () => (
  <>
    <CardHeader>
      <CardTitle>Register</CardTitle>
      <CardDescription>Enter your information below to register to new account</CardDescription>
    </CardHeader>
    <SignUpForm />
  </>
)
