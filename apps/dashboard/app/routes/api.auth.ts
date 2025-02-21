import { data } from 'react-router'

import { invalidateSessionToken, validateSessionToken } from '@yuki/auth'

import type { Route } from './+types/api.auth'

export const loader = async ({ request }: Route.LoaderArgs) => {
  const authToken = getAuthToken(request)
  return data(await validateSessionToken(authToken ?? ''))
}

export const action = async ({ request }: Route.ActionArgs) => {
  const authToken = getAuthToken(request)

  if (authToken) {
    await invalidateSessionToken(authToken)
    return data(
      { message: 'Sign out successfully' },
      {
        headers: {
          'Set-Cookie':
            'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict',
        },
      },
    )
  } else return data({ message: 'Sign out failed' }, { status: 401 })
}

const getAuthToken = (req: Request) => {
  const cookieHeader = req.headers.get('Cookie')
  const authToken = cookieHeader
    ?.split(';')
    .find((cookie) => cookie.trim().startsWith('auth_token='))
    ?.split('=')[1]

  return authToken ?? null
}
