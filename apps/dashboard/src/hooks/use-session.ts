import { useMutation, useQuery } from '@tanstack/vue-query'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useRouter } from 'vue-router'

import type { SignIn } from '@yuki/api/validators/auth'
import { toast } from '@yuki/ui/vue/toast'

import { env } from '@/env'
import { api } from '@/lib/api'

export const useSession = () => {
  const authToken = useCookies(['auth_token'])
  const router = useRouter()

  const getSession = useQuery({
    queryKey: ['session'],
    queryFn: () => api.auth.getSession.query(),
    enabled: !!authToken.get('auth_token'),
  })

  const signIn = useMutation({
    mutationKey: ['signIn'],
    mutationFn: (data: SignIn) => api.auth.signIn.mutate(data),
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: async (data) => {
      authToken.set('auth_token', data.token, {
        path: '/',
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(data.expiresAt),
      })
      toast.success('Logged in successfully')
      await getSession.refetch()
      await router.push('/')
    },
  })

  const signOut = useMutation({
    mutationKey: ['signOut'],
    mutationFn: () => api.auth.signOut.mutate(),
    onSuccess: async () => {
      authToken.remove('auth_token')
      await getSession.refetch()
      await router.push('/auth/sign-in')
    },
  })

  return {
    session: getSession.data,
    signIn: signIn.mutate,
    signOut: signOut.mutate,
    isLoading: getSession.isLoading,
    isSigningIn: signIn.isPending,
    isSigningOut: signOut.isPending,
  }
}
