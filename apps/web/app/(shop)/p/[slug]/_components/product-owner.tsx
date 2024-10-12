import Image from 'next/image'
import Link from 'next/link'

import type { User } from '@yuki/db'
import { Button } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

import { slugify } from '@/lib/utils'

export const ProductOwner: React.FC<{ owner: User }> = ({ owner }) => (
  <section className="mt-8 flex items-center gap-8 rounded-lg border p-6 shadow-md">
    <Image
      src={owner.avatar ?? owner.discord?.avatar ?? ''}
      alt={owner.name}
      width={100}
      height={100}
      className="aspect-square rounded-full"
    />

    <article className="flex-1">
      <Typography level="h3">
        {owner.name}{' '}
        {owner.discord && (
          <span className="text-base font-medium text-muted-foreground">
            #{owner.discord.username}
          </span>
        )}
      </Typography>

      <Typography>
        <strong>Joined at:</strong> {owner.createdAt.toDateString()}
      </Typography>
    </article>

    <div className="flex flex-col gap-2">
      <Button asChild>
        <Link href={`/u/${slugify(owner.name, owner.id)}`}>Profile</Link>
      </Button>

      <Button variant="outline" asChild>
        <a
          href={
            owner.discord
              ? `https://discord.com/users/${owner.discord.id}`
              : `mailto:${owner.email}`
          }
          target="_blank"
          rel="noreferrer noopener"
        >
          Message
        </a>
      </Button>
    </div>
  </section>
)
