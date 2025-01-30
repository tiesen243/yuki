import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter, createTRPCContext } from '@yuki/api'

import { env } from '@/env'

/**
 * Configure basic CORS headers
 * You should extend this to match your needs
 */
const setCorsHeaders = (res: Response) => {
  res.headers.set(
    'Access-Control-Allow-Origin',
    env.DASHBOARD_URL ? `https://${env.DASHBOARD_URL}` : 'http://localhost:3001',
  )
  res.headers.set('Access-Control-Request-Method', '*')
  res.headers.set('Access-Control-Allow-Methods', 'OPTIONS,GET,POST')
  res.headers.set(
    'Access-Control-Allow-Headers',
    'x-trpc-source,authorization,content-type,accept',
  )
}

export const OPTIONS = () => {
  const response = new Response(null, { status: 204 })
  setCorsHeaders(response)
  return response
}

const handler = async (req: NextRequest) => {
  const heads = new Headers(req.headers)
  const token = (await cookies()).get('auth_token')?.value ?? ''
  if (!heads.get('Authorization')) heads.set('Authorization', `Bearer ${token}`)

  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext: () => createTRPCContext({ headers: heads }),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error)
    },
  })

  setCorsHeaders(response)
  return response
}

export { handler as GET, handler as POST }
