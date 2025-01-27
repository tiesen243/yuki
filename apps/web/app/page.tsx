import { Suspense } from 'react'

import { Typography } from '@yuki/ui/typography'

import { api, HydrateClient } from '@/lib/trpc/server'
import { AuthShowcase } from './_components/auth-showcase'
import { CreatePostForm, PostCardSkeleton, PostList } from './_components/post'
import { ThemeBtn } from './_components/theme-btn'

export default function HomePage() {
  void api.post.all.prefetch()

  return (
    <HydrateClient>
      <main className="container flex min-h-dvh max-w-screen-lg flex-col items-center justify-center overflow-x-hidden">
        <Typography level="h1" className="mb-4 text-center">
          Create{' '}
          <span className="text-foreground dark:text-[hsl(221,89%,72%)]">Yuki</span> Turbo
        </Typography>

        <AuthShowcase />

        <CreatePostForm />

        <ThemeBtn />

        <div className="mt-4 w-full max-w-2xl md:max-h-80 md:overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList />
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  )
}
