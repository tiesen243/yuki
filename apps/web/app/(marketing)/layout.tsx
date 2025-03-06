import Link from 'next/link'

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header className="flex h-12 w-full items-center px-4">
        <div className="container flex items-center justify-between">
          <nav className="flex items-center gap-4">
            {navs.slice(0, 2).map((nav) => (
              <Link key={nav.href} href={nav.href} className="hover:underline">
                {nav.name}
              </Link>
            ))}
          </nav>

          <nav className="flex items-center gap-4">
            {navs.slice(2).map((nav) => (
              <Link key={nav.href} href={nav.href} className="hover:underline">
                {nav.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {children}
    </>
  )
}

const navs = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
]
