import Image from 'next/image'
import Link from 'next/link'

export const Brand: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Link href="/" className="flex items-center gap-2">
    <Image
      src="/assets/logo.svg"
      alt="logo"
      width={28}
      height={28}
      className="object-cover dark:invert"
    />
    {children}
  </Link>
)
