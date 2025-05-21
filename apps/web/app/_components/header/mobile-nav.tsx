'use client'

import { useState } from 'react'

import { Button } from '@yuki/ui/button'
import { MenuIcon } from '@yuki/ui/icons'
import { cn } from '@yuki/ui/utils'

import { Searchbar } from '@/app/_components/header/search-bar'

export const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={() => {
          setOpen((prev) => !prev)
        }}
      >
        <MenuIcon />
      </Button>

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={cn(
          'bg-background/10 fixed inset-0 z-40 h-screen w-screen backdrop-blur-xl backdrop-saturate-150 md:hidden',
          open ? 'block opacity-100' : 'hidden opacity-0',
          'transition-opacity duration-300 ease-in-out',
        )}
        onClick={() => {
          setOpen(false)
        }}
      />

      <aside
        className={cn(
          'bg-sidebar fixed inset-0 z-50 flex h-screen w-2/3 flex-col shadow-md md:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
          'transition-transform duration-300 ease-in-out',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b p-4">
          <span className="text-foreground text-2xl font-bold">Yukinu</span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setOpen(false)
            }}
          >
            <MenuIcon />
          </Button>
        </div>

        <div className="p-4">
          <Searchbar />
        </div>

        <nav className="flex h-full grow flex-col gap-1 overflow-y-auto px-4 py-0">
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className="hover:bg-sidebar-accent rounded-md px-2 py-1"
            >
              Nav Item {i + 1}
            </div>
          ))}
        </nav>

        <div className="mt-4 flex items-center justify-between border-t p-4">
          &copy; {new Date().getFullYear()} Yukinu. All rights reserved.
        </div>
      </aside>
    </>
  )
}
