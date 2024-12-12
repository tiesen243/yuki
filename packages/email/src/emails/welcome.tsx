import { Button, Text } from '@react-email/components'

import { emailEnv } from '@yuki/email/env'

import { EmailLayout } from './_layout'

export const Welcome = (data: Record<string, string>) => ({
  subject: 'Welcome',
  react: () => (
    <EmailLayout preview="Welcome to Yuki!">
      <Text>Hi {data.name}</Text>
      <Text>
        Welcome to Yuki, the sales intelligence platform that helps you uncover qualified leads and
        close deals faster.
      </Text>

      <Button
        className="inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[rgb(77,130,33)] text-sm font-medium text-[#fafafa]"
        href={getBaseUrl()}
      >
        Get started
      </Button>
    </EmailLayout>
  ),
})

export default Welcome({ name: 'Yuki' }).react

const getBaseUrl = () => {
  if (emailEnv.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${emailEnv.VERCEL_PROJECT_PRODUCTION_URL.replace('dashboard.', '')}`
  return 'http://localhost:3000'
}
