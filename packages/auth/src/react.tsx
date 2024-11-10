'use client'

import * as React from 'react'

import type { Session, User } from '@yuki/db'

type SessionContext = null | (Session & { user: User })

const sessionContext = React.createContext<SessionContext>(null)

export const SessionProvider: React.FC<React.PropsWithChildren<{ session: SessionContext }>> = ({
  session,
  children,
}) => {
  return <sessionContext.Provider value={session}>{children}</sessionContext.Provider>
}

export const useSession = () => {
  const session = React.useContext(sessionContext)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (session === undefined) throw new Error('useSession must be used within a SessionProvider')
  return session
}
