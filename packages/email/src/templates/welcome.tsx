import { Button, Text } from '@react-email/components'

import type { EmailProps } from '@yuki/email'

import { getAppUrl, Layout } from './_layout'

export const Welcome = (props: EmailProps) => (
  <Layout preview="Welcome to Yuki">
    <Text className="leading-6">Hi {props.data.name},</Text>
    <Text className="leading-6">
      Welcome to the Yuki, We’re excited to have you on board. You’re just one step away from
      getting started. Click the button below to get started.
    </Text>

    <Button
      className="w-full rounded-lg bg-foreground py-4 text-center font-medium text-background"
      href={getAppUrl()}
    >
      Get started
    </Button>
  </Layout>
)

Welcome.PreviewProps = {
  data: { name: 'Yuki' },
} as EmailProps

export default Welcome
