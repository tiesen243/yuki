'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { ChevronRightIcon } from '@yuki/ui/icons'

export const Breadcrumb: React.FC = () => {
  const pathName = usePathname().split('/').filter(Boolean)

  return (
    <ul className="flex items-center gap-1">
      {pathName.length > 0 && (
        <li className="flex items-center gap-1">
          <Button variant="ghost" className="h-6 rounded-md px-2" asChild>
            <Link href="/">~</Link>
          </Button>
          {pathName.length > 0 && <ChevronRightIcon size={16} />}
        </li>
      )}
      {pathName.map((name, idx) => (
        <li key={idx} className="flex items-center gap-1">
          <Button variant="ghost" className="h-6 rounded-md px-2" asChild>
            <Link href={`/${pathName.slice(0, pathName.indexOf(name) + 1).join('/')}`}>{name}</Link>
          </Button>
          {idx < pathName.length - 1 && <ChevronRightIcon size={16} />}
        </li>
      ))}
    </ul>
  )
}
