import { Button, Link, Text } from '@react-email/components'

import { emailEnv } from '@yuki/email/env'

import { EmailLayout } from './_layout'

const formattedDate = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'medium',
}).format(new Date())

export const ForgotPassword = (data: Record<string, string>) => ({
  subject: 'Forgot Password',
  react: () => (
    <EmailLayout preview="You updated the password for your Yuki account">
      <Text>Hi {data.name},</Text>
      <Text>
        Someone recently requested a password change for your Yuki account on {formattedDate}. If
        this was you, you can set a new password here:
      </Text>

      <Button
        className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[rgb(77,130,33)] px-3 text-sm font-medium text-[#fafafa]"
        href={`${getBaseUrl()}/forgot-password/reset?token=${data.token}&email=${data.email}`}
      >
        Reset password
      </Button>

      <Text>
        If you don't want to change your password or didn't request this, just ignore and delete
        this message.
      </Text>

      <Text>
        To keep your account secure, please don't forward this email to anyone. See our Help Center
        for{' '}
        <Link href="https://youtu.be/qWNQUvIk954" className="underline">
          more security tips.
        </Link>
      </Text>
    </EmailLayout>
  ),
})

export default ForgotPassword({ name: 'Yuki', token: 'yukikaze', email: 'yuki@example.com' }).react

const getBaseUrl = () => {
  if (emailEnv.VERCEL_PROJECT_PRODUCTION_URL) {
    if (!emailEnv.VERCEL_PROJECT_PRODUCTION_URL.startsWith('dashboard.'))
      return `https://dashboard.${emailEnv.VERCEL_PROJECT_PRODUCTION_URL}`
    return `https://${emailEnv.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'http://localhost:3001'
}
