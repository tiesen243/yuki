import type { NextPage } from 'next'

import { Accordion } from '@yuki/ui/accordion'

import { AccountSettingList } from './_components/account-setting-list'
import { ThemeSetting } from './_components/theme-setting'

const Page: NextPage = () => (
  <Accordion type="multiple">
    <ThemeSetting />
    <AccountSettingList />
  </Accordion>
)

export default Page
