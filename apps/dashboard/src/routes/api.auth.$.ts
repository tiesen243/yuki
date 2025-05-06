import { handlers } from '@yuki/auth'

import type { Route } from './+types/api.auth.$'

export const loader = ({ request }: Route.LoaderArgs) => handlers(request)
export const action = ({ request }: Route.ActionArgs) => handlers(request)
