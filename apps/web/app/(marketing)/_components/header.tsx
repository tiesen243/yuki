import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Header = () => (
  <header className="sticky inset-0 z-50 border-b bg-background/70 py-4 backdrop-blur-xl backdrop-saturate-150">
    <div className="container flex items-center justify-between">
      <Link href="/home#hero" className="flex items-center gap-2 text-lg font-semibold">
        <Image src="/assets/logo.svg" alt="Logo" width={32} height={32} className="dark:invert" />
        <span>Yuki</span>
      </Link>

      <nav className="flex items-center gap-4">
        {navs.map((nav, idx) => (
          <Link key={idx} href={nav.href} className="text-lg font-semibold hover:underline">
            {nav.title}
          </Link>
        ))}
      </nav>
    </div>
  </header>
)

const navs = [
  { title: 'Features', href: '/home#features' },
  { title: 'Tech Stack', href: '/home#tech-stack' },
  { title: 'Reviews', href: '/home#reviews' },
  { title: 'FAQ', href: '/home#faq' },
]
