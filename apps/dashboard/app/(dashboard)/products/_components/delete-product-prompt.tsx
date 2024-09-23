'use client'

import { useRouter } from 'next/navigation'

import type { Product } from '@yuki/db'
import { Button } from '@yuki/ui/button'
import { CardFooter } from '@yuki/ui/card'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export const DeleteProductPrompt: React.FC<Props> = ({ product }) => {
  const router = useRouter()
  const { mutate, isPending } = api.product.delete.useMutation({
    onSuccess: async () => {
      router.back()
      toast.success('Product deleted')
      await new Promise((resolve) => setTimeout(resolve, 150))
      router.refresh()
    },
    onError: (error) => toast.error(error.message),
  })
  return (
    <CardFooter className="justify-end gap-4">
      <Button variant="destructive" onClick={() => mutate({ id: product.id })} disabled={isPending}>
        Delete {product.name}
      </Button>
      <Button variant="secondary" onClick={() => router.back()} disabled={isPending}>
        Cancel
      </Button>
    </CardFooter>
  )
}

interface Props {
  product: Product
}
