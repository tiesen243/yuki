'use client'

import { useRouter } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { User } from '@yuki/db'
import { Button } from '@yuki/ui/button'
import { CardContent } from '@yuki/ui/card'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export const UpdateUserForm: React.FC<{ user: User }> = () => {
  const router = useRouter()

  const { mutate, isPending, error } = api.product.update.useMutation({
    onSuccess: async (data) => {
      router.back()
      toast.success(`Product ${data.name} updated`)
      await new Promise((resolve) => setTimeout(resolve, 150))
      router.refresh()
    },
    onError: (e) => !e.data?.zodError && toast.error(e.message),
  })

  return (
    <CardContent className="space-y-4" asChild>
      <form>
        <Button className="w-full" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </CardContent>
  )
}
