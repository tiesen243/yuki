import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

import Yuki from '@/public/assets/imgs/yuki.png'

export default function NotFoundPage() {
  return (
    <main className="container flex grow flex-col items-center justify-center py-8">
      <Image src={Yuki} alt="Yuki" className="mb-8 size-72 object-cover" />
      <Typography level="h1" className="mb-4">
        Oops! Page Not Found
      </Typography>
      <Typography className="mb-8">
        Looks like this page got lost in cyberspace!
      </Typography>

      <Link href="/" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
        Take me home
      </Link>
    </main>
  )
}
