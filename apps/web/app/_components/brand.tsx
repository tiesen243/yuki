import Image from 'next/image'
import Link from 'next/link'

export const Brand: React.FC<{ href?: string }> = ({ href = '/' }) => (
  <Link href={href} className="flex items-center gap-2">
    <Image
      src="/assets/logo.svg"
      alt="logo"
      width={28}
      height={28}
      className="object-cover dark:invert"
    />
    <span className="text-xl font-bold">Yuki</span>
  </Link>
)
