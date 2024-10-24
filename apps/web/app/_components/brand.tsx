import Image from 'next/image'
import Link from 'next/link'

export const Brand: React.FC<{ href?: string }> = ({ href = '/' }) => (
  <Link href={href} className="flex items-center gap-2">
    <Image
      src="/assets/logo.svg"
      alt="logo"
      width={40}
      height={40}
      className="object-cover dark:invert"
      priority
    />
    <span className="sr-only text-2xl font-bold md:not-sr-only">Yuki</span>
  </Link>
)
