'use client'

import * as React from 'react'

import type { Session } from '@yuki/auth'

import { api } from '@/lib/trpc/react'

const sessionContext = React.createContext<
  | {
      session?: Session
      isLoading: boolean
    }
  | undefined
>(undefined)

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, isLoading } = api.auth.getSession.useQuery()
  return (
    <sessionContext.Provider value={{ session, isLoading }}>
      {children}
    </sessionContext.Provider>
  )
}

export const useSession = () => {
  const ctx = React.use(sessionContext)
  if (!ctx) throw new Error('useSession must be used within a SessionProvider')
  return ctx
}
