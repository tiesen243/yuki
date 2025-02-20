import { useQuery } from '@tanstack/react-query'

import type { Route } from './+types/_index'
import { useTRPC } from '@/lib/trpc/react'
import { getQueryClient, trpc } from '@/lib/trpc/server'

export const loader = async ({ request }: Route.LoaderArgs) => {
  await getQueryClient().prefetchQuery(
    trpc(request).product.getAll.queryOptions({}),
  )
}

export default function HomePage(_: Route.ComponentProps) {
  const trpc = useTRPC()

  const { data } = useQuery(trpc.product.getAll.queryOptions({}))

  return <main className="container py-4">{JSON.stringify(data, null, 2)}</main>
}
