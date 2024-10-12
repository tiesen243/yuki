import Link from 'next/link'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@yuki/ui/accordion'
import { ChevronRightIcon } from '@yuki/ui/icons'

export const AccountSettingList: React.FC = () => (
  <AccordionItem value="account-setting">
    <AccordionTrigger>Account Setting</AccordionTrigger>

    <AccordionContent className="space-y-2">
      {settings.map((setting, idx) => (
        <Link key={idx} href={setting.href} className="group flex items-center">
          <span>{setting.title}</span>
          <div className="-mr-2 ml-2 h-[1px] bg-primary transition-all ease-linear group-hover:flex-1" />
          <ChevronRightIcon
            size={16}
            className="opacity-0 transition-opacity ease-linear group-hover:opacity-100"
          />
        </Link>
      ))}
    </AccordionContent>
  </AccordionItem>
)

const settings = [
  {
    title: 'Change Password',
    href: '/account/settings/change-password',
  },
  {
    title: 'Link Account',
    href: '/account/settings/link-account',
  },
]
