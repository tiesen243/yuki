import Link from 'next/link'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@yuki/ui/accordion'
import { ChevronRightIcon } from '@yuki/ui/icons'

import { signOut } from '@/lib/actions'

export const AccountSetting: React.FC = () => {
  return (
    <AccordionItem value="account-setting">
      <AccordionTrigger>Account Setting</AccordionTrigger>

      <AccordionContent className="space-y-2">
        <Link href="/account" className="group flex items-center">
          <span>Profile</span>
          <div className="-mr-2 ml-2 h-[1px] bg-primary transition-all ease-linear group-hover:flex-1" />
          <ChevronRightIcon
            size={16}
            className="opacity-0 transition-opacity ease-linear group-hover:opacity-100"
          />
        </Link>

        <Link href="/account/settings/change-password" className="group flex items-center">
          <span>Change Password</span>
          <div className="-mr-2 ml-2 h-[1px] bg-primary transition-all ease-linear group-hover:flex-1" />
          <ChevronRightIcon
            size={16}
            className="opacity-0 transition-opacity ease-linear group-hover:opacity-100"
          />
        </Link>

        <Link href="/account/settings/link-account" className="group flex items-center">
          <span>Link Account</span>
          <div className="-mr-2 ml-2 h-[1px] bg-primary transition-all ease-linear group-hover:flex-1" />
          <ChevronRightIcon
            size={16}
            className="opacity-0 transition-opacity ease-linear group-hover:opacity-100"
          />
        </Link>

        <form action={signOut}>
          <button className="group flex w-full items-center">
            <span>Sign Out</span>
            <div className="-mr-2 ml-2 h-[1px] bg-primary transition-all ease-linear group-hover:flex-1" />
            <ChevronRightIcon
              size={16}
              className="opacity-0 transition-opacity ease-linear group-hover:opacity-100"
            />
          </button>
        </form>
      </AccordionContent>
    </AccordionItem>
  )
}
