import { CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { createMetadata } from '@/lib/metadata'
import { ResetPasswordForm } from './page.client'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  if (!token)
    return (
      <CardHeader>
        <CardTitle>Invalid reset link</CardTitle>
        <CardDescription>
          This password reset link is invalid or has expired. Please request a
          new password reset.
        </CardDescription>
      </CardHeader>
    )

  return (
    <>
      <CardHeader>
        <CardTitle>Create new password</CardTitle>
        <CardDescription>
          Enter your new password below to reset your account password
        </CardDescription>
      </CardHeader>

      <ResetPasswordForm token={token} />
    </>
  )
}

export const metadata = createMetadata({
  title: 'Reset password',
  description: 'Create a new password for your account',
})
