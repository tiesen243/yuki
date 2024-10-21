import { Text } from '@react-email/components'

import type { EmailProps } from '../config'
import { hello } from '../config'
import { EmailLayout } from './_layout'

const AdminDeleteAccount: React.FC<EmailProps> = ({
  subject = 'Account deleted',
  preview = 'Your account has been deleted from our platform by an admin',
  data = { name: 'Yuki' },
}) => (
  <EmailLayout preview={preview} subject={subject}>
    <Text>{hello(data.name)}</Text>
    <Text>
      Your account has been deleted by an admin. If you didn&apos;t make this request, please
      contact us immediately. We cant help you recover your account.
    </Text>
  </EmailLayout>
)

export default AdminDeleteAccount
