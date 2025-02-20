import { data } from 'react-router'

import { invalidateSessionToken, validateSessionToken } from '@yuki/auth'

import type { Route } from './+types/api.auth.$auth'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Request-Method': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,GET,POST',
  'Access-Control-Allow-Headers':
    'authorization,accept,content-type,trpc-accept,x-trpc-source',
} as const

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  if (params.auth === 'get-session') {
    const authToken = getAuthToken(request.headers) ?? ''
    const session = await validateSessionToken(authToken)
    return data(session, { headers: corsHeaders })
  }
}

export const action = async ({ request, params }: Route.ActionArgs) => {
  const authToken = getAuthToken(request.headers)

  if (params.auth === 'sign-out') {
    if (!authToken) {
      return data(
        { success: false, message: 'No authentication token found' },
        { status: 401, headers: corsHeaders },
      )
    }

    await invalidateSessionToken(authToken)
    return data(
      { success: true },
      {
        headers: {
          ...corsHeaders,
          'Set-Cookie': 'auth_token=; Path=/;',
        },
      },
    )
  }
}

const getAuthToken = (headers: Headers) => {
  const cookieHeader = headers.get('cookie')

  const authToken = cookieHeader
    ?.split(';')
    .find((c) => c.trim().startsWith('auth_token='))
    ?.split('=')
    .at(-1)

  return authToken
}
