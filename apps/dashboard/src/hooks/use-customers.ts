import { useQuery } from '@tanstack/vue-query'

import { api } from '@/lib/api'

interface Params {
  page?: number
}
export const useCustomers = ({ page = 1 }: Params) => {
  const getCustomers = useQuery({
    queryKey: ['customers', { page }],
    queryFn: async () => api.user.getAll.query({ page }),
  })

  return {
    customers: getCustomers.data,
    isLoading: getCustomers.isLoading,
  }
}
