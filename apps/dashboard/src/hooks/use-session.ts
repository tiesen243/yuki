import { useQuery } from '@tanstack/vue-query'

import { api } from '@/lib/api'

export const useSession = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: () => api.auth.getSession.query(),
  })

  return {
    session: data,
    isLoading,
  }
}
