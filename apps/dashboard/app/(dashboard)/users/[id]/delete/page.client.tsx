'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { CardDescription, CardFooter, CardHeader, CardTitle } from '@yuki/ui/card'
import { toast } from '@yuki/ui/sonner'

import { api } from '@/lib/trpc/react'

export const PageClient: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()

  const [{ user }] = api.user.getOne.useSuspenseQuery({ id })
  const { mutate, isPending } = api.product.delete.useMutation({
    onSuccess: async () => {
      router.back()
      toast.success(`Product ${user.name} deleted`)
      await new Promise((resolve) => setTimeout(resolve, 150))
      router.refresh()
    },
    onError: (error) => toast.error(error.message),
  })

  return (
    <>
      <CardHeader>
        <CardTitle>Delete {user.name}</CardTitle>
        <CardDescription>
          Are you sure you want to delete this user? This action cannot be undone.
        </CardDescription>
      </CardHeader>

      <CardFooter className="justify-end gap-4">
        <Button variant="destructive" onClick={() => mutate({ id: user.id })} disabled={isPending}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={() => router.back()} disabled={isPending}>
          Cancel
        </Button>
      </CardFooter>
    </>
  )
}
