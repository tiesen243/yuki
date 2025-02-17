import { Text } from '@react-email/components'

import { EmailLayout } from './_layout'

export const ChangePassword = {
  subject: 'Your password has been changed',
  Component,
}

function Component({ name = 'Yuki' }: { name?: string }) {
  return (
    <EmailLayout
      title="Password Changed Successfully"
      preview="Your account password has been successfully changed"
      name={name}
    >
      <Text className="mb-4">Your password has been successfully changed.</Text>

      <Text className="mb-4 bg-yellow-50 p-4">
        If you did not make this change, please contact our support team immediately.
      </Text>

      <Text className="text-sm">Thank you for keeping your account secure!</Text>
    </EmailLayout>
  )
}

export default Component
