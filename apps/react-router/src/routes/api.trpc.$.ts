import type { Route } from './+types/api.trpc.$'

export { handler } from '@yukinu/api'

export const loader = ({ request }: Route.LoaderArgs) => handler(request)
export const action = ({ request }: Route.ActionArgs) => handler(request)
