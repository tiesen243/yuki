import { Button, Text } from '@react-email/components'

import { EmailLayout } from './_layout'

export const ForgotPassword = {
  subject: 'Reset Your Password',
  Component,
}

function Component({
  name = 'Yuki',
  resetUrl = 'http://localhost:3000/forgot-password/reset?token=yukikaze',
}: {
  name?: string
  resetUrl?: string
}) {
  return (
    <EmailLayout
      title="Reset Your Password"
      preview="Follow the link to reset your password"
      name={name}
    >
      <Text className="mb-4">We received a request to reset your password.</Text>

      <Text className="mb-4">
        Click the button below to reset your password. If you didn&apos;t request this,
        you can safely ignore this email.
      </Text>

      <Button
        href={resetUrl}
        className="w-[calc(100%-2rem)] rounded-md bg-[#171717] px-4 py-2 text-center text-sm text-[#fafafa]"
      >
        Reset Password
      </Button>

      <Text className="mb-4">This link will expire in 24 hours.</Text>

      <Text className="mb-2">
        If the button doesn&apos;t work, copy and paste this link into your browser:
      </Text>
      <Text className="break-all text-blue-600">{resetUrl}</Text>
    </EmailLayout>
  )
}

export default Component
