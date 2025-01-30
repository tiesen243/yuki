import { Typography } from '@yuki/ui/typography'

import { NewAddressForm } from './page.client'

export default function NewAddressPage() {
  return (
    <main className="bg-secondary flex-1 rounded py-4 shadow-md">
      <div className="container mb-4">
        <Typography level="h2">Add Address</Typography>
        <Typography color="muted">
          Add your address information to receive your orders from us.
        </Typography>
      </div>

      <hr className="border-primary/20" />

      <NewAddressForm />
    </main>
  )
}
