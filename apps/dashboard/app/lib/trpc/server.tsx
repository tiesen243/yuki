import { cache } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'

import { appRouter, createTRPCContext } from '@yuki/api'

import { createQueryClient } from '@/lib/trpc/query-client'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async (req: Request) => {
  const heads = new Headers()
  heads.set('x-trpc-source', 'rsc')

  const cookieHeader = req.headers.get('cookie')
  const auth_token = cookieHeader
    ?.split(';')
    .find((c) => c.trim().startsWith('auth_token='))
  if (auth_token) heads.set('authorization', `Bearer ${auth_token}`)

  return createTRPCContext({ headers: heads })
})

const getQueryClient = cache(createQueryClient)

const trpc = (req: Request) =>
  createTRPCOptionsProxy({
    ctx: () => createContext(req),
    router: appRouter,
    queryClient: getQueryClient,
  })

function HydrateClient({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}

export { trpc, getQueryClient, HydrateClient }
