import { Button } from '@yuki/ui/button'
import { Skeleton } from '@yuki/ui/skeleton'
import { Typography } from '@yuki/ui/typography'

export const ProductDetailSkeleton: React.FC = () => (
  <section className="grid gap-4 md:grid-cols-12 md:gap-8">
    <Skeleton className="aspect-[3/4] h-auto w-full rounded-lg object-cover md:col-span-4" />

    <article className="flex h-full flex-col md:col-span-8">
      <Typography level="h2" className="animate-pulse">
        Loading...
      </Typography>

      <Skeleton className="mr-2 h-[300px] w-full" />

      <div className="flex-1" />

      <Skeleton className="mt-4 h-6 w-1/3" />

      <div className="mt-4 flex justify-between">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
      </div>

      <Button className="mt-4 w-full animate-pulse">Loading...</Button>
    </article>
  </section>
)
