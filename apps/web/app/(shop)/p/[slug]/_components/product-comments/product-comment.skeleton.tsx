import { StarIcon } from '@yuki/ui/icons'
import { Skeleton } from '@yuki/ui/skeleton'
import { Typography } from '@yuki/ui/typography'

export const ProductCommentsSkeleton: React.FC = () => (
  <section className="mt-8 space-y-4">
    <Typography level="h3">Comments (NaN/5)</Typography>

    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i}>
        <div className="flex items-center gap-2">
          <Skeleton className="aspect-square size-8 rounded-full" />

          <div className="space-y-1">
            <Skeleton className="h-4 w-16" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="size-4 animate-pulse stroke-muted-foreground" />
              ))}
            </div>

            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <Skeleton className="ml-10 mt-2 h-12 w-4/5" />
      </div>
    ))}
  </section>
)
