import type { NextPage } from 'next'

import { Accordion } from '@yuki/ui/accordion'

import { AccountSetting } from './_components/account-setting'
import { ThemeSetting } from './_components/theme-setting'

const Page: NextPage = () => (
  <Accordion type="multiple">
    <ThemeSetting />
    <AccountSetting />
  </Accordion>
)

export default Page
