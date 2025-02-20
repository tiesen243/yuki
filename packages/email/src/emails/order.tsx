import { Column, Img, Row, Section, Text } from '@react-email/components'

import { EmailLayout } from './_layout'

export const Order = {
  subject: 'Order Confirmation',
  Component,
}

function Component({
  name = 'Yuki',
  status = 'DELIVERED',
  order = mockOrderData,
}: {
  name?: string
  status?: 'PENDING' | 'DELIVERED'
  order?: {
    id: string
    items: { name: string; image: string; quantity: number; price: number }[]
    total: number
    address: { name: string; state: string; street: string } | null
  }
}) {
  const messageMap = {
    PENDING: (
      <>
        <Text className="mb-6">
          Thank you for your purchase! Here&apos;s a summary of your order:
        </Text>
        <Text className="mb-2">
          Order ID: <span className="font-medium">{order.id}</span>
        </Text>
      </>
    ),
    DELIVERED: (
      <>
        <Text className="mt-4">
          Great news! Your order{' '}
          <span className="font-medium">#{order.id}</span> has been delivered
          successfully.
        </Text>
        <Text className="mt-6 text-base font-bold">Order Details:</Text>
      </>
    ),
  }

  return (
    <EmailLayout
      title="Order Confirmation"
      preview={`Thanks for your order, ${name}!`}
      name={name}
    >
      {messageMap[status]}

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
              <Text className="m-0 font-medium">{item.name}</Text>
              <Text className="m-0 text-sm">
                Quantity: {item.quantity} × ${item.price.toFixed(2)}
              </Text>
              <Text className="m-0 text-sm">
                Subtotal: ${(item.quantity * item.price).toFixed(2)}
              </Text>
            </Section>
          </Column>
        ))}
      </Row>

      <Text className="m-0 mt-2 text-end text-lg font-medium">
        Total: ${order.total.toFixed(2)}
      </Text>

      {order.address && (
        <Section className="mb-6">
          <Text className="mb-2 font-medium">Shipping Address:</Text>
          <Text>
            {order.address.name}
            <br />
            {order.address.street}
            <br />
            {order.address.state}
          </Text>
        </Section>
      )}
    </EmailLayout>
  )
}

export default Component

const mockOrderData = {
  id: 'ORD000069',
  items: [
    {
      name: 'Product 1',
      image: 'https://picsum.photos/seed/1/200/200',
      quantity: 2,
      price: 29.99,
    },
    {
      name: 'Product 2',
      image: 'https://picsum.photos/seed/1/200/200',
      quantity: 1,
      price: 19.99,
    },
    {
      name: 'Product 3',
      image: 'https://picsum.photos/seed/3/200/200',
      quantity: 4,
      price: 69.99,
    },
  ],
  total: 359.93,
  address: { name: 'John Doe', street: '123 Main St', state: 'CA' },
}
