import type { CreateInput, Query } from '@yuki/api/validators/product'

import { api } from '@/lib/api'

export const useProducts = (params: Partial<Query>) => {
  const queryClient = useQueryClient()

  const getProducts = useQuery({
    queryKey: ['product', 'getAll', params],
    queryFn: () => api.product.getAll.query({ page: 1 }),
  })

  const createProducts = useMutation({
    mutationKey: ['product', 'create'],
    mutationFn: (data: CreateInput) => api.product.create.mutate(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['product', 'getAll'],
      })
    },
  })

  return {
    products: getProducts.data,
    createProduct: createProducts.mutate,
    isLoading: getProducts.isLoading,
    isCreating: createProducts.isPending,
  }
}
