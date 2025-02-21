import { Outlet } from 'react-router'

import type { Route } from './+types/_main'

export default function MainLayout(_: Route.ComponentProps) {
  return (
    <>
      <Outlet />
    </>
  )
}
