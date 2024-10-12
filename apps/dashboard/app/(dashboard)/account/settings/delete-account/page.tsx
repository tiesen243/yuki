import { Typography } from '@yuki/ui/typography'

import { PageClient } from './page.client'

const Page = () => {
  return (
    <>
      <Typography level="h1" color="destructive">
        Delete Account
      </Typography>

      <Typography>
        Are you sure you want to delete your account? This action cannot be undone.
      </Typography>

      <PageClient />
    </>
  )
}

export default Page
