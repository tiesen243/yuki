'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'

import type { Session } from '@yuki/auth'

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
  const { data: session, isLoading } = useQuery({
    queryKey: ['getSession'],
    queryFn: async () => {
      const res = await fetch('/api/auth/getSession')
      return res.json() as Promise<Session>
    },
  })
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
