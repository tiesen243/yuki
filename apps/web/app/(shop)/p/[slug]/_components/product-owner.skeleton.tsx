import { Button } from '@yuki/ui/button'
import { Skeleton } from '@yuki/ui/skeleton'

export const ProductOwnerSkeleton: React.FC = () => (
  <section className="mt-8 flex items-center gap-8 rounded-lg border p-6 shadow-md">
    <Skeleton className="aspect-square size-16 rounded-full" />

    <article className="flex-1">
      <Skeleton className="h-8 w-1/3" />

      <Skeleton className="mt-6 h-6 w-1/5" />
    </article>

    <div className="flex flex-col gap-2">
      <Button className="animate-pulse">Loading...</Button>

      <Button variant="outline" className="animate-pulse">
        Loading...
      </Button>
    </div>
  </section>
)
