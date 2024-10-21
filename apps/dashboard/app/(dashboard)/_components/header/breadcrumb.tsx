'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { ChevronRightIcon } from '@yuki/ui/icons'

export const Breadcrumb: React.FC = () => {
  const pathName = usePathname().split('/').filter(Boolean)

  return (
    <ul className="flex items-center gap-1">
      {pathName.map((name, idx) => (
        <li key={idx} className="flex items-center gap-1">
          <Button variant="secondary" className="h-6 rounded-md px-2" asChild>
            <Link href={`/${pathName.slice(0, idx + 1).join('/')}`}>{name}</Link>
          </Button>
          {idx < pathName.length - 1 && <ChevronRightIcon />}
        </li>
      ))}
    </ul>
  )
}
