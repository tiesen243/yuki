'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { MenuIcon, XIcon } from '@yuki/ui/icons'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-sidebar/95 supports-[backdrop-filter]:bg-sidebar/60 sticky top-0 z-50 w-full border-b backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/home" className="flex items-center space-x-2">
            <Image
              src="/assets/logo.svg"
              alt="Yuki Logo"
              width={24}
              height={24}
              className="size-6 dark:invert"
            />
            <span className="hidden font-bold sm:inline-block">Yuki</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#showcase"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              App
            </Link>
            <Link
              href="#testimonials"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex md:items-center md:gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
        <button
          className="block md:hidden"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen)
          }}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <div className="flex flex-col space-y-3 pb-4">
            <Link
              href="#features"
              className="hover:text-primary text-sm font-medium transition-colors"
              onClick={() => {
                setIsMenuOpen(false)
              }}
            >
              Features
            </Link>
            <Link
              href="#showcase"
              className="hover:text-primary text-sm font-medium transition-colors"
              onClick={() => {
                setIsMenuOpen(false)
              }}
            >
              App
            </Link>
            <Link
              href="#testimonials"
              className="hover:text-primary text-sm font-medium transition-colors"
              onClick={() => {
                setIsMenuOpen(false)
              }}
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="hover:text-primary text-sm font-medium transition-colors"
              onClick={() => {
                setIsMenuOpen(false)
              }}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="justify-start"
              >
                <Link href="#login">Log in</Link>
              </Button>
              <Button size="sm" asChild className="justify-start">
                <Link href="#signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
