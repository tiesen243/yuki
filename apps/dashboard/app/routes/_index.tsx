import { useQuery } from '@tanstack/react-query'

import { useTRPC } from '@/lib/trpc/react'

export default function HomePage() {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.product.getAll.queryOptions({}))

  return (
    <main className="container py-4">
      {JSON.stringify(data?.products, null, 2)}
    </main>
  )
}
