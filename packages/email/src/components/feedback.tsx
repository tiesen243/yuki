import type { EmailProps } from '../config'
import { Text } from '@react-email/components'

import { EmailLayout } from './_layout'

const Feedback: React.FC<EmailProps> = ({
  preview = 'You have a new message',
  subject = 'Improvement suggestion',
  replyTo,
  data = { message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
}) => (
  <EmailLayout preview={preview} subject={subject} replyTo={replyTo}>
    <Text>{data.message}</Text>
  </EmailLayout>
)

export default Feedback
