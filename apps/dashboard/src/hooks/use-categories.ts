import { useQuery } from '@tanstack/vue-query'

import { api } from '@/lib/api'

interface Params {
  page?: number
}

export const useCategories = ({ page = 1 }: Params) => {
  const getCategories = useQuery({
    queryKey: ['categories', { page }],
    queryFn: () => api.category.getAll.query({ page }),
  })

  return {
    categories: getCategories.data,
    isLoading: getCategories.isLoading,
  }
}
