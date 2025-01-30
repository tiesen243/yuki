import { Typography } from '@yuki/ui/typography'

import { UpdateAddressForm } from './page.client'

export default async function UpdateAddressPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  return (
    <main className="bg-secondary flex-1 rounded py-4 shadow-md">
      <div className="container mb-4">
        <Typography level="h2">Update Address</Typography>
        <Typography color="muted">
          Add your address information to receive your orders from us.
        </Typography>
      </div>

      <hr className="border-primary/20" />

      <UpdateAddressForm id={id} />
    </main>
  )
}
