import { Column, Img, Row, Section, Text } from '@react-email/components'

import { EmailLayout } from './_layout'

export const Delivered = {
  subject: 'Your order has been delivered! 📦',
  Component,
}

function Component({
  name = 'Yuki',
  order = mockOrderData,
}: {
  name?: string
  order?: {
    id: string
    items: { name: string; image: string; quantity: number; price: number }[]
    total: number
    address: { name: string; state: string; street: string } | null
  }
}) {
  return (
    <EmailLayout
      title="Order Delivered"
      preview="Your package has been delivered successfully"
      name={name}
    >
      <Text className="mt-4 text-base">
        Great news! Your order #{order.id} has been delivered successfully.
      </Text>

      <Text className="mt-6 text-base font-bold">Order Details:</Text>

      <Row>
        {order.items.map((item, index) => (
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

      <Text className="mt-2 text-end text-base font-bold">
        Total Amount: ${order.total.toFixed(2)}
      </Text>

      <Text className="mt-6 text-base">
        Delivery Address:
        <br />
        {order.address?.name}
        <br />
        {order.address?.street}
        <br />
        {order.address?.state}
      </Text>

      <Text className="mt-6 text-base">
        If you haven&apos;t received it or have any questions, please don&apos;t hesitate
        to contact our support team.
      </Text>
    </EmailLayout>
  )
}

export default Component

const mockOrderData = {
  id: 'ORD000069',
  items: [
    {
      name: 'Product 1',
      image: 'https://picsum.photos/seed/4/200/200',
      quantity: 2,
      price: 29.99,
    },
    {
      name: 'Product 2',
      image: 'https://picsum.photos/seed/5/200/200',
      quantity: 1,
      price: 19.99,
    },
  ],
  total: 79.97,
  address: { name: 'John Doe', street: '123 Main St', state: 'CA' },
}
