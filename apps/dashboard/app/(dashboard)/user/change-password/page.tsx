import { auth } from '@yuki/auth'

import { ChangePasswordForm } from '../_components/change-password-form'

export default async () => {
  const session = await auth()
  if (!session) return null

  const hasPassword = !!session.user.password
  return <ChangePasswordForm hasPassword={hasPassword} />
}
