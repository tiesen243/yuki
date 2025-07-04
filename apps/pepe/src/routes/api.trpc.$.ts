import { handler } from '@yuki/api'

import type { Route } from './+types/api.trpc.$'

export const loader = ({ request }: Route.LoaderArgs) => handler(request)
export const action = ({ request }: Route.ActionArgs) => handler(request)
