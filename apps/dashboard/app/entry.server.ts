import type { AppLoadContext, EntryContext } from 'react-router'
import { handleRequest } from '@vercel/react-router/entry.server'

export default async function EntryServer(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext?: AppLoadContext,
): Promise<Response> {
  const nonce = crypto.randomUUID()
  const response = await handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    routerContext,
    loadContext,
    { nonce },
  )
  response.headers.set('Content-Security-Policy', `script-src 'nonce-${nonce}'`)
  return response
}
