'use client'

import * as React from 'react'

import type { Options, SessionResult } from './types'

/**
 * Supported authentication providers
 */
type Provider = 'credentials' | keyof Options

/**
 * Authentication session context value type
 * @template TProvider - The type of authentication provider
 */
type SessionContextValue = {
  /**
   * Signs in a user using the specified provider
   * @param provider - The authentication provider to use
   * @param options - Provider-specific options (credentials or redirect configuration)
   * @returns Promise that resolves when sign-in process completes
   */
  signIn: <TProvider extends Provider>(
    provider: TProvider,
    ...args: TProvider extends 'credentials'
      ? [options: { email: string; password: string }]
      : [options?: { redirectTo: string }]
  ) => Promise<TProvider extends 'credentials' ? string : undefined>

  /**
   * Signs out the current user
   * @returns Promise that resolves when sign-out process completes
   */
  signOut: () => Promise<void>

  /**
   * Refreshes the session data with the server
   * @param token - Optional token to use for authentication
   * @returns Promise that resolves when refresh completes
   */
  refresh: (token?: string) => Promise<void>
} & (
  | { status: 'loading'; session: SessionResult }
  | {
      status: 'authenticated'
      session: { user: NonNullable<SessionResult['user']>; expires: Date }
    }
  | { status: 'unauthenticated'; session: { expires: Date } }
)

/**
 * React context for authentication session data
 */
const SessionContext = React.createContext<SessionContextValue | undefined>(
  undefined,
)

/**
 * Hook to access the current authentication session
 * @returns The current session context value
 * @throws Error if used outside of a SessionProvider
 */
export function useSession(): SessionContextValue {
  const ctx = React.use(SessionContext)
  if (!ctx) throw new Error('useSession must be used within a SessionProvider')
  return ctx
}

/**
 * Props for the SessionProvider component
 */
interface SessionProviderProps {
  /** Child components that will have access to the session context */
  children: React.ReactNode
  /** Optional initial session data */
  session?: SessionResult
}

/**
 * Provider component that manages authentication state
 * @param props - Component props
 * @returns SessionProvider component
 */
export function SessionProvider({
  children,
  session: initialSession,
}: Readonly<SessionProviderProps>) {
  const hasInitialSession = initialSession !== undefined
  const [isLoading, setIsLoading] = React.useState(!hasInitialSession)
  const [session, setSession] = React.useState<SessionResult>(() => {
    if (hasInitialSession) return initialSession
    return { expires: new Date() }
  })

  /**
   * Determines the current authentication status based on session state
   */
  const status = React.useMemo(() => {
    if (isLoading) return 'loading' as const
    return session.user
      ? ('authenticated' as const)
      : ('unauthenticated' as const)
  }, [session, isLoading])

  /**
   * Fetches the current session data from the server
   */
  const fetchSession = React.useCallback(
    async (token?: string): Promise<void> => {
      setIsLoading(true)
      try {
        const res = await fetch('/api/auth', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        if (!res.ok) throw new Error(`Failed to fetch session: ${res.status}`)

        const sessionData = (await res.json()) as SessionResult
        setSession(sessionData)
      } catch (error) {
        console.error('Error fetching session:', error)
        setSession({ expires: new Date() })
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  /**
   * Signs in a user using the specified provider and options
   */
  const signIn = React.useCallback(
    async <TProvider extends Provider>(
      provider: TProvider,
      ...args: TProvider extends 'credentials'
        ? [options: { email: string; password: string }]
        : [options?: { redirectTo: string }]
    ): Promise<TProvider extends 'credentials' ? string : undefined> => {
      if (provider === 'credentials') {
        try {
          const res = await fetch('/api/auth/sign-in', {
            method: 'POST',
            body: JSON.stringify(args[0]),
          })

          const json = (await res.json()) as { token: string; error: string }

          if (!res.ok) throw new Error(json.error || 'Authentication failed')

          await fetchSession(json.token)
          return json.token as TProvider extends 'credentials'
            ? string
            : undefined
        } catch (error) {
          console.error('Sign in error:', error)
          throw error
        }
      } else {
        const redirectTo =
          (args[0] as { redirectTo?: string }).redirectTo ?? '/'
        window.location.href = `/api/auth/sign-in/${provider}?redirect_to=${encodeURIComponent(redirectTo)}`
        return undefined as TProvider extends 'credentials' ? string : undefined
      }
    },
    [fetchSession],
  )

  /**
   * Signs out the current user
   */
  const signOut = React.useCallback(async (): Promise<void> => {
    try {
      const res = await fetch('/api/auth/sign-out', { method: 'POST' })
      if (!res.ok) throw new Error(`Sign out failed: ${res.status}`)
      setSession({ expires: new Date() })
      window.location.reload()
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }, [])

  // Fetch initial session if not provided
  React.useEffect(() => {
    if (hasInitialSession) return
    void fetchSession()
  }, [fetchSession, hasInitialSession])

  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(
    () =>
      ({
        session,
        status,
        signIn,
        signOut,
        refresh: fetchSession,
      }) as SessionContextValue,
    [session, status, signIn, signOut, fetchSession],
  )

  return <SessionContext value={value}>{children}</SessionContext>
}
