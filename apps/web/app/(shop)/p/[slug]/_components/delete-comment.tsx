import { Button } from '@yuki/ui/button'
import { XIcon } from '@yuki/ui/icons'

import { api } from '@/lib/trpc/react'

export const DeleteComment: React.FC<{ id: string }> = ({ id }) => {
  const utils = api.useUtils()
  const { mutate, isPending } = api.product.deleteComment.useMutation({
    onSuccess: () => utils.product.getOne.invalidate({ id }),
  })

  return (
    <Button
      size="icon"
      variant="outline"
      className="absolute right-0 top-0 aspect-square size-6"
      onClick={() => mutate({ id })}
      disabled={isPending}
    >
      <XIcon className="size-4" />
    </Button>
  )
}
