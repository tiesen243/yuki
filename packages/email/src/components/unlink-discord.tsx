import { Text } from '@react-email/components'

import type { EmailProps } from '../config'
import { hello } from '../config'
import { EmailLayout } from './_layout'

const UnlinkDiscord: React.FC<EmailProps> = ({
  subject = 'You have unlinked your Discord account',
  preview = 'You have successfully unlinked your Discord account',
  data = { name: 'Yuki' },
}) => (
  <EmailLayout subject={subject} preview={preview}>
    <Text>{hello(data.name)}</Text>
    <Text>
      You have successfully unlinked your Discord account from your Yuki account. If you didn&apos;t
      make this change, please contact us immediately.
    </Text>
    <Text>
      If you have any questions or need help, feel free to send us an email. We will get back to you
      as soon as possible.
    </Text>
    <Text>Thanks for using Yuki! 🚀</Text>
  </EmailLayout>
)

export default UnlinkDiscord
