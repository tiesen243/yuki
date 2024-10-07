import type { NextPage } from 'next'

import { auth } from '@yuki/auth'

import { AccountSettingForm } from './settings/_components/account-setting-form'

const Page: NextPage = async () => {
  const session = await auth()
  if (!session) return null

  return <AccountSettingForm user={session.user} />
}

export default Page
