import { Button, Text } from '@react-email/components'

import { EmailLayout } from './_layout'

export const Welcome = {
  subject: 'Welcome to Yuki - Your Shopping Journey Begins',
  Component,
}

function Component({ name = 'Yuki' }: { name?: string }) {
  return (
    <EmailLayout
      title="Welcome to Yuki"
      preview="Welcome to our shop. Exclusive deals, free shipping on your first order, and more await you."
      name={name}
    >
      <Text className="mb-4 text-base">
        Thank you for joining our online shopping community! We&apos;re thrilled
        to have you here.
      </Text>
      <Text className="mb-4 text-base">
        Here&apos;s what you can enjoy as our member:
      </Text>
      <ul className="mb-4 list-disc pl-6">
        <li>Exclusive member discounts</li>
        <li>Early access to sales</li>
        <li>Free shipping on your first order</li>
      </ul>

      <Button
        className="w-[calc(100%-2rem)] rounded-md bg-[#171717] px-4 py-2 text-center text-sm text-[#fafafa]"
        href="https://shop.tiesen.id.vn"
      >
        Start Shopping Now
      </Button>
    </EmailLayout>
  )
}

export default Component
