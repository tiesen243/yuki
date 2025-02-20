'use client'

import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@yuki/ui/utils'

export const NavLink: React.FC<LinkProps & React.ComponentProps<'a'>> = ({
  className,
  ...props
}) => {
  const pathName = usePathname()
  const isActive = pathName.startsWith(props.href)

  return (
    <Link
      {...props}
      className={cn(
        'hover:text-foreground',
        isActive ? 'text-foreground' : 'text-muted-foreground',
        className,
      )}
    />
  )
}
