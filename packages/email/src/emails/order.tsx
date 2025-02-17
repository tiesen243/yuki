import { Column, Img, Row, Section, Text } from '@react-email/components'

import { EmailLayout } from './_layout'

export const Order = {
  subject: 'Order Confirmation',
  Component,
}

function Component({
  name = 'Yuki',
  items = mockOrderData,
}: {
  name?: string
  items?: { image: string; name: string; price: number; quantity: number }[]
}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <EmailLayout
      title="Order Confirmation"
      preview={`Thanks for your order, ${name}!`}
      name={name}
    >
      <Text className="mb-6 text-gray-800">
        Thank you for your purchase! Here&apos;s a summary of your order:
      </Text>

      <Row>
        {items.map((item, index) => (
          <Column key={index} className="mb-4 flex flex-row">
            <Img
              src={item.image}
              width={64}
              height={64}
              alt={item.name}
              className="mr-4 rounded-lg"
            />
            <Section className="flex-1">
              <Text className="m-0 font-medium text-gray-900">{item.name}</Text>
              <Text className="m-0 text-sm text-gray-600">
                Quantity: {item.quantity} × ${item.price.toFixed(2)}
              </Text>
              <Text className="m-0 text-sm text-gray-700">
                Subtotal: ${(item.quantity * item.price).toFixed(2)}
              </Text>
            </Section>
          </Column>
        ))}
      </Row>

      <Section className="mt-2 pt-4">
        <Text className="m-0 text-end text-lg font-semibold">
          Total: ${total.toFixed(2)}
        </Text>
      </Section>
    </EmailLayout>
  )
}

export default Component

const mockOrderData = [
  {
    image: 'https://picsum.photos/seed/1/200/200',
    name: 'Classic Cotton T-Shirt',
    price: 29.99,
    quantity: 2,
  },
  {
    image: 'https://picsum.photos/seed/2/200/200',
    name: 'Denim Jeans',
    price: 79.99,
    quantity: 1,
  },
  {
    image: 'https://picsum.photos/seed/3/200/200',
    name: 'Running Shoes',
    price: 129.99,
    quantity: 1,
  },
]
