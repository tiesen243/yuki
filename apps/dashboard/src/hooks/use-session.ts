import { useRouter } from 'vue-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useCookies } from '@vueuse/integrations/useCookies'

import type { Session } from '@yuki/auth'
import { toast } from '@yuki/ui/vue/toast'

import { env } from '@/env'

export const useSession = () => {
  const baseUrl = `${env.VUE_PUBLIC_WEB_URL}/api/auth`

  const cookies = useCookies(['auth_token'])
  const queryClient = useQueryClient()
  const router = useRouter()

  const session = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const token: string | undefined = cookies.get('auth_token')

      const res = await fetch(baseUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
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

      return { session }
    },
    onSuccess: async ({ session }) => {
      cookies.set('auth_token', session.token, {
        path: '/',
        secure: env.NODE_ENV === 'production',
        expires: new Date(session.expiresAt),
        sameSite: 'lax',
      })

      await queryClient.invalidateQueries({ queryKey: ['auth'] })
      await router.push('/')
    },
    onError: (e) => toast.error(e.message),
  })

  const signOut = useMutation({
    mutationKey: ['auth', 'sign-out'],
    mutationFn: async () => {
      const token: string | undefined = cookies.get('auth_token')

      const res = await fetch(`${baseUrl}/sign-out?dashboard=true`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = (await res.json()) as { message: string }
      if (!res.ok) throw new Error(json.message)
    },
    onSuccess: async () => {
      cookies.remove('auth_token')
      await queryClient.invalidateQueries({ queryKey: ['auth'] })
      await router.push('/sign-in')
    },
    onError: (e) => toast.error(e.message),
  })

  return {
    session: session.data,
    isLoading: session.isLoading,
    signIn: signIn.mutate,
    isSigning: signIn.isPending,
    signOut: signOut.mutate,
    isSignOuting: signOut.isPending,
  }
}
