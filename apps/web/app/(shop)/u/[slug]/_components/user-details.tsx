import Image from 'next/image'

import type { User } from '@yuki/db'
import { buttonVariants } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

interface Props {
  user: User & { _count: { products: number } }
  rating: number
}

export const UserDetails: React.FC<Props> = ({ user, rating }) => (
  <section className="grid gap-8 md:grid-cols-12">
    <Image
      src={user.avatar ?? user.discord?.avatar ?? ''}
      alt={user.name}
      width={400}
      height={400}
      className="mx-auto h-auto w-1/2 rounded-lg object-cover md:col-span-3 md:w-full"
    />

    <article className="grid grid-cols-2 gap-4 rounded-lg p-0 md:col-span-9 md:bg-secondary md:p-6 md:text-start">
      <Typography level="h1">
        {user.name}{' '}
        {user.discord && (
          <span className="text-base font-medium text-muted-foreground">
            #{user.discord.username}
          </span>
        )}
      </Typography>
      <Typography>Rating: {rating.toFixed(2)}/5</Typography>
      <Typography>Joined at: {user.createdAt.toDateString()}</Typography>
      <Typography>Numer of products: {user._count.products}</Typography>

      <div className="flex-1" />

      <a
        href={
          user.discord ? `https://discord.com/users/${user.discord.id}` : `mailto:${user.email}`
        }
        target="_blank"
        rel="noreferrer noopener"
        className={buttonVariants()}
      >
        Send a message
      </a>
    </article>
  </section>
)
