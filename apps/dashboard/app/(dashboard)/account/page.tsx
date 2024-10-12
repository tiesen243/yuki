import type { NextPage } from 'next'

import { auth } from '@yuki/auth'

import { PageClient } from './page.client'

const Page: NextPage = async () => {
  const session = await auth()
  if (!session) return null

  return <PageClient user={session.user} />
}

export default Page
