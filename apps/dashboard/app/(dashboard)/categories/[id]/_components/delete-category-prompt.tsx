'use client'

import { useRouter } from 'next/navigation'

import type { Category } from '@yuki/db'
import { Button } from '@yuki/ui/button'
import { CardFooter } from '@yuki/ui/card'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export const DeleteCategoryPrompt: React.FC<{ category: Category }> = ({ category }) => {
  const router = useRouter()

  const { mutate, isPending } = api.category.delete.useMutation({
    onSuccess: async () => {
      router.back()
      toast.success(`Category ${category.name} deleted`)
      await new Promise((resolve) => setTimeout(resolve, 150))
      router.refresh()
    },
    onError: (error) => toast.error(error.message),
  })

  return (
    <CardFooter className="justify-end gap-4">
      <Button
        variant="destructive"
        onClick={() => mutate({ id: category.id })}
        disabled={isPending}
      >
        Delete {category.name}
      </Button>
      <Button variant="secondary" onClick={() => router.back()} disabled={isPending}>
        Cancel
      </Button>
    </CardFooter>
  )
}
