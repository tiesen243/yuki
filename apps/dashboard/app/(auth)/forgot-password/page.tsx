import type { NextPage } from 'next'

import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { seo } from '@/lib/seo'
import { ForgotPasswordForm } from '../_components/forgot-password-form'

const Page: NextPage = () => (
  <>
    <CardHeader>
      <CardTitle className="text-2xl">Forgot Password</CardTitle>
      <CardDescription>
        Enter your email below to reset your password and we will send you a link to reset your
        password
      </CardDescription>
    </CardHeader>

    <ForgotPasswordForm />
  </>
)

export default Page

export const metadata = seo({
  title: 'Forgot Password',
  description:
    'Enter your email below to reset your password and we will send you a link to reset your password',
  url: '/forgot-password',
})
