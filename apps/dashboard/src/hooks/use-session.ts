import { useMutation, useQuery } from '@tanstack/vue-query'
import { useCookies } from '@vueuse/integrations/useCookies'

import type { Session } from '@yuki/auth'
import { toast } from '@yuki/ui/vue/toast'

export const useSession = () => {
  const baseUrl = `${import.meta.env.VITE_WEB_URL}/api/auth`

  const cookies = useCookies(['auth_token'])

  const token: string | undefined = cookies.get('auth_token')

  const session = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const res = await fetch(baseUrl, { credentials: 'include' })
      return (await res.json()) as Session
    },
  })

  const signIn = useMutation({
    mutationKey: ['auth', 'credentials'],
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const res = await fetch(
        `${baseUrl}/credentials?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      )
      const { message, session } = (await res.json()) as {
        message: string
        session: { token: string; expiresAt: string }
      }
      if (!res.ok) throw new Error(message)

      cookies.set('auth_token', session.token, {
        httpOnly: !import.meta.env.DEV,
        path: '/',
        secure: !import.meta.env.DEV,
        expires: new Date(session.expiresAt),
        sameSite: 'lax',
      })
    },
    onSuccess: () => session.refetch(),
    onError: (e) => toast.error(e.message),
  })

  const signOut = useMutation({
    mutationKey: ['auth', 'signOut'],
    mutationFn: async () => {
      const res = await fetch(`${baseUrl}/signOut?dashboard=true`, {
        credentials: 'include',
      })
      const json = (await res.json()) as { message: string }
      if (!res.ok) throw new Error(json.message)
    },
    onSuccess: () => session.refetch(),
    onError: (e) => toast.error(e.message),
  })

  return {
    token,
    session: session.data,
    isLoading: session.isLoading,
    signIn: signIn.mutate,
    isSigning: signIn.isPending,
    signOut: signOut.mutate,
    isSignOuting: signOut.isPending,
  }
}
