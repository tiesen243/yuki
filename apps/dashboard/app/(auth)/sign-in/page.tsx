import { CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { PageClient } from './page.client'

const Page: React.FC = () => (
  <>
    <CardHeader>
      <CardTitle>Sign In</CardTitle>
      <CardDescription>Fill the form below to sign in to your account</CardDescription>
    </CardHeader>

    <CardContent>
      <PageClient />
    </CardContent>
  </>
)

export default Page
