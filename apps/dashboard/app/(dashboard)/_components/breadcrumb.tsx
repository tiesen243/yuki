'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@yuki/ui'
import { ChevronRightIcon } from '@yuki/ui/icons'

export const BreadCrumb: React.FC = () => {
  const pathNames = usePathname().split('/').filter(Boolean)

  return (
    <nav className="flex items-center gap-2 text-muted-foreground">
      <span className="flex items-center gap-2">
        <Link href="/" className={cn(pathNames.length === 0 && 'text-foreground')}>
          Dashboard
        </Link>
        {pathNames.length > 0 && <ChevronRightIcon size={16} />}
      </span>

      {pathNames.map((pathName, index) => (
        <span
          key={index}
          className={cn(
            'flex items-center gap-2 capitalize',
            index === pathNames.length - 1 && 'text-foreground',
          )}
        >
          <Link href={'/' + pathNames.slice(0, index + 1).join('/')}>
            {pathName.replace('-', ' ')}
          </Link>
          {index < pathNames.length - 1 && <ChevronRightIcon size={16} />}
        </span>
      ))}
    </nav>
  )
}
