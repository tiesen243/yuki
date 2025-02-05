import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import type { CreateInput, Query } from '@yuki/api/validators/product'
import { toast } from '@yuki/ui/vue/toast'

import { api } from '@/lib/api'

export const useProducts = (query: Partial<Query>) => {
  const queryClient = useQueryClient()
  const getProducts = useQuery({
    queryKey: ['product', 'getAll'],
    queryFn: () => api.product.getAll.query(query),
  })

  const createProduct = useMutation({
    mutationKey: ['product', 'create'],
    mutationFn: (data: CreateInput) => api.product.create.mutate(data),
    onSuccess: async () => {
      toast.success('Product created')
      await queryClient.invalidateQueries({
        queryKey: ['product', 'getAll'],
      })
    },
  })

  return {
    products: getProducts.data,
    createProduct: createProduct.mutate,
    isLoading: getProducts.isLoading,
    isCreateting: createProduct.isPending,
  }
}
