import { Typography } from '@yuki/ui/typography'

import { api, HydrateClient } from '@/lib/trpc/server'

export default function CartPage() {
  void api.cart.getCart.prefetch()

  return (
    <HydrateClient>
      <main className="bg-secondary flex-1 rounded py-4 shadow-md">
        <div className="container mb-4">
          <Typography level="h2">Change Password</Typography>
          <Typography color="muted">
            Change your password to secure your account. Make sure to use a strong
            password.
          </Typography>
        </div>

        <hr className="border-primary/20" />
      </main>
    </HydrateClient>
  )
}
