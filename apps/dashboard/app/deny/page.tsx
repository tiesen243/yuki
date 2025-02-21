import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

import { env } from '@/env'

export default function DenyPage() {
  return (
    <main className="container flex grow flex-col items-center justify-center py-8">
      <Image
        src={`${env.WEB_URL}/assets/yuki.png`}
        alt="Yuki"
        width={300}
        height={300}
        className="mb-8 object-cover"
      />
      <Typography variant="h1" className="mb-4">
        Access Denied
      </Typography>
      <Typography className="mb-8">
        Sorry, you don&apos;t have permission to access this area.
      </Typography>

      <Link
        href={env.WEB_URL}
        className={buttonVariants({ variant: 'outline', size: 'lg' })}
      >
        Back to Web
      </Link>
    </main>
  )
}
