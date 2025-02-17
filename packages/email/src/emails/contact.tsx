import { Text } from '@react-email/components'

import { EmailLayout } from './_layout'

export const Contact = {
  subject: 'Received a message from Contact form',
  Component,
}

function Component({
  firstName = 'Yukikaze',
  lastName = 'IJN',
  senderEmail = 'yuki@example.com',
  subject = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
  message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
}: {
  senderEmail?: string
  firstName?: string
  lastName?: string
  subject?: string
  message?: string
}) {
  return (
    <EmailLayout
      title="New Contact Form Submission"
      preview={`New message from ${firstName} ${lastName}`}
    >
      <Text>You have received a new message from the contact form:</Text>

      <Text className="mt-6 text-base">
        <span className="font-semibold">From: </span>
        {firstName} {lastName} {`<${senderEmail}>`}
      </Text>

      <Text className="mt-3 text-base">
        <span className="font-semibold">Subject: </span>
        {subject}
      </Text>

      <Text className="mt-6 text-base">
        <span className="font-semibold">Message:</span>
        <br />
        {message}
      </Text>
    </EmailLayout>
  )
}

export default Component
