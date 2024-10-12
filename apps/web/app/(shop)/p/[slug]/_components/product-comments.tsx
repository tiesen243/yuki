import { useState } from 'react'

import type { Comment, User } from '@yuki/db'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Button } from '@yuki/ui/button'
import { SendHorizonalIcon, StarIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'
import { Typography } from '@yuki/ui/typography'

import { api } from '@/lib/trpc/react'
import { DeleteComment } from './delete-comment'

export const ProductComments: React.FC<{
  id: string
  comments: Array<Comment & { user: User }>
  avgStars: number
}> = ({ id, comments, avgStars }) => {
  const utils = api.useUtils()

  const [formData, setFormData] = useState<{ content: string; stars: number }>({
    content: '',
    stars: 5,
  })
  const { mutate, isPending } = api.product.comment.useMutation({
    onSuccess: () => utils.product.getOne.invalidate({ id }),
  })

  return (
    <section className="mt-8 space-y-4">
      <Typography level="h3">Comments ({avgStars.toFixed(2)}/5)</Typography>
      {comments.length === 0 && (
        <Typography className="text-center text-muted-foreground">No comments yet</Typography>
      )}

      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage
                src={comment.user.avatar ?? comment.user.discord?.avatar}
                alt={comment.user.name}
              />
              <AvatarFallback>{comment.user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div>
              <p>{comment.user.name}</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: comment.stars }).map((_, i) => (
                  <StarIcon key={i} className="size-4 fill-warning stroke-warning" />
                ))}
                {Array.from({ length: 5 - comment.stars }).map((_, i) => (
                  <StarIcon key={i} className="size-4 stroke-muted-foreground" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {comment.createdAt.toDateString()}
              </span>
            </div>

            <DeleteComment id={comment.id} />
          </div>

          <p className="pl-10 pt-2">{comment.content}</p>
        </div>
      ))}

      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          mutate({ productId: id, ...formData })
          setFormData({ content: '', stars: 5 })
        }}
      >
        <label htmlFor="content" className="sr-only">
          Comment
        </label>
        <Input
          name="content"
          placeholder="What do you think about this product?"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />

        <label htmlFor="stars" className="sr-only">
          Stars
        </label>
        <Input
          name="stars"
          type="number"
          min={1}
          max={5}
          value={formData.stars}
          onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value) })}
          className="basis-1/12"
        />
        <Button
          size="icon"
          className="aspect-square"
          aria-label="Send comment"
          disabled={isPending}
        >
          <SendHorizonalIcon className="size-4" />
        </Button>
      </form>
    </section>
  )
}
