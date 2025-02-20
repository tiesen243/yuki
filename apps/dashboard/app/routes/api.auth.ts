import { auth } from '@yuki/auth'

import type { Route } from './+types/api.auth'

export const loader = async ({ request }: Route.LoaderArgs) => {
  const session = await auth(request)
  return {
    session,
  }
}
