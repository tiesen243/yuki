import { useQuery } from '@tanstack/vue-query'

import { api } from '@/lib/api'

interface Params {
  page?: number
}
export const useProducts = ({ page = 1 }: Params) => {
  const getProducts = useQuery({
    queryKey: ['products', { page }],
    queryFn: () => api.product.getAll.query({ page }),
  })

  return {
    products: getProducts.data,
    isLoading: getProducts.isLoading,
  }
}
