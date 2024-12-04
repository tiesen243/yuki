'use client'

import * as React from 'react'

import type { Session, User } from '@yuki/db'

type SessionContext = (Session & { user: User }) | null

const sessionContext = React.createContext<SessionContext>(null)

export const SessionProvider: React.FC<{ session: SessionContext; children: React.ReactNode }> = ({
  session,
  children,
}) => <sessionContext.Provider value={session}>{children}</sessionContext.Provider>

export const useSession = () => {
  const ctx = React.useContext(sessionContext)
  return ctx
}
