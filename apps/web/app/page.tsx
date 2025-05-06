import { Suspense } from 'react'
import Link from 'next/link'

import { auth } from '@yuki/auth'
import { Button } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'
import {
  CreatePost,
  PostCardSkeleton,
  PostList,
  SubscriptionStatus,
} from './page.client'

export default function HomePage() {
  void getQueryClient().prefetchQuery(trpc.post.all.queryOptions())

  return (
    <HydrateClient>
      <main className="container max-w-2xl py-4">
        <Typography variant="h1" className="text-center">
          Create
          <span className="text-[#78a9ff]"> Yuki </span>
          Turbo
        </Typography>

        <Typography size="lg" className="text-center">
          A type-safe fullstack framework for building web applications.
        </Typography>

        <AuthShowcase />

        <section className="mt-4 flex flex-col gap-4">
          <h2 className="sr-only">Posts List Section</h2>

          <CreatePost />

          <SubscriptionStatus />

          <Suspense
            fallback={Array.from({ length: 5 }, (_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          >
            <PostList />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}

const AuthShowcase: React.FC = async () => {
  const session = await auth()

  return (
    <section className="mt-4 flex flex-col gap-4">
      <h2 className="sr-only">Authenticating Section</h2>

      {!session.user && (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}

      {session.user && (
        <div className="flex justify-between">
          <Typography variant="h3">Welcome, {session.user.name}</Typography>
          <form action="/api/auth/sign-out" method="POST">
            <Button variant="secondary">Logout</Button>
          </form>
        </div>
      )}
    </section>
  )
}
