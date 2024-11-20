import { Button, Text } from '@react-email/components'

import type { EmailProps } from '@yuki/email'

import { getAppUrl, Layout } from './_layout'

export const Welcome = (props: EmailProps) => (
  <Layout preview={props.preview}>
    <Text className="leading-6">Hi {props.data.name},</Text>
    <Text className="leading-6">{props.message}</Text>

    <Button
      className="w-full rounded-lg bg-foreground py-4 text-center font-medium text-background"
      href={getAppUrl()}
    >
      Get started
    </Button>
  </Layout>
)

Welcome.PreviewProps = {
  preview: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
  message:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec leo eget lacus sagittis lacinia. Donec ac felis nunc. Fusce semper, neque vel fringilla rutrum, quam dui mattis quam, et porta felis sem nec tortor. Mauris sit amet lectus id metus accumsan convallis. Phasellus id nibh ut mauris feugiat malesuada in non mi. Fusce fringilla libero purus, id suscipit purus accumsan vel. Etiam tincidunt eu massa nec lobortis. Nam nunc diam, posuere nec augue vitae, interdum hendrerit libero. Fusce lacinia consequat erat, non ultrices nunc feugiat at. Praesent sit amet sem sodales urna viverra iaculis sed ac ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis eros sem, tristique ut metus id, tempus tincidunt est. In eu odio libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  data: { name: 'Yuki' },
} as EmailProps

export default Welcome
