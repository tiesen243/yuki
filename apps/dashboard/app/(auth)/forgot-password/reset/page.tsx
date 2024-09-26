import type { NextPage } from 'next'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import type { Props } from '../../_components/reset-password-form'
import { seo } from '@/lib/seo'
import { ResetPasswordForm } from '../../_components/reset-password-form'

const Page: NextPage<Props> = ({ searchParams }) => (
  <>
    <CardHeader>
      <CardTitle className="text-2xl">Reset Password</CardTitle>
      <CardDescription>Enter your new password below to reset your password.</CardDescription>
    </CardHeader>

    <ResetPasswordForm {...searchParams} />
  </>
)

export default Page

export const metadata = seo({
  title: 'Reset Password',
  description: 'Enter your new password below to reset your password',
  url: '/reset-password',
})
