import { Text } from '@react-email/components'

import type { EmailProps } from '../config'
import { hello } from '../config'
import { EmailLayout } from './_layout'

const DeleteAccount: React.FC<EmailProps> = ({
  subject = 'Account deleted',
  preview = 'You have successfully deleted your account from our platform',
  data = { name: 'Yuki' },
}) => (
  <EmailLayout preview={preview} subject={subject}>
    <Text>{hello(data.name)}</Text>
    <Text>
      Your account has been deleted. If you didn&apos;t make this request, please contact us
      immediately. We cant help you recover your account.
    </Text>
    <Text>
      We feel sad to see you leave. If you have any feedback or suggestions, please let us know. We
      are always looking for ways to improve our service.
    </Text>
    <Text>Thanks for beling with us! 🙏</Text>
  </EmailLayout>
)

export default DeleteAccount
