import * as React from 'react'
import { useNavigate } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { Session } from '@yuki/auth'

import { env } from '@/env'

const sessionContext = React.createContext<
  | {
      session?: Session
      isLoading: boolean
      signOut: () => void
      isSigningOut: boolean
    }
  | undefined
>(undefined)

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useNavigate()
  const queryClient = useQueryClient()

  const session = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const res = await fetch(`${env.VITE_WEB_URL}/api/auth`, {
        credentials: 'include',
      })
      return (await res.json()) as Session
    },
    retry: false,
  })

  const signOut = useMutation({
    mutationKey: ['auth', 'sign-out'],
    mutationFn: async () =>
      fetch(`${env.VITE_WEB_URL}/api/auth/sign-out`, {
        method: 'POST',
        credentials: 'include',
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth'] })
      await router({ pathname: '/' })
    },
  })

  return (
    <sessionContext.Provider
      value={{
        session: session.data,
        isLoading: session.isLoading,
        signOut: signOut.mutate,
        isSigningOut: signOut.isPending,
      }}
    >
      {children}
    </sessionContext.Provider>
  )
}

export const useSession = () => {
  const ctx = React.use(sessionContext)
  if (!ctx) throw new Error('useSession must be used within a SessionProvider')
  return ctx
}
