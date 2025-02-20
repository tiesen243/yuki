import { useSuspenseQuery } from '@tanstack/react-query'

import { useTRPC } from '@/lib/trpc/react'

export const Products: React.FC = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.product.getAll.queryOptions({}))

  return <pre>{JSON.stringify(data.products, null, 2)}</pre>
}
