import { CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { PageClient } from './page.client'

const Page: React.FC = () => (
  <>
    <CardHeader>
      <CardTitle>Sign Up</CardTitle>
      <CardDescription>Fill the form below to sign up for a new account</CardDescription>
    </CardHeader>

    <CardContent>
      <PageClient />
    </CardContent>
  </>
)

export default Page
