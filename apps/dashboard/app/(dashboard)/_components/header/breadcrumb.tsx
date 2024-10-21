'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { Button } from '@yuki/ui/button'
import { ChevronRightIcon } from '@yuki/ui/icons'

export const Breadcrumb: React.FC = () => {
  const pathName = usePathname().split('/').filter(Boolean)
  const renderPathName = useMemo(() => {
    if (pathName.length > 3) return ['...', ...pathName.slice(-2)]
    return pathName
  }, [pathName])

  return (
    <ul className="flex items-center gap-1">
      {pathName.length > 0 && (
        <li className="flex items-center gap-1">
          <Button variant="secondary" className="h-6 rounded-md px-2" asChild>
            <Link href="/">~</Link>
          </Button>
          {pathName.length > 0 && <ChevronRightIcon />}
        </li>
      )}
      {renderPathName.map((name, idx) => (
        <li key={idx} className="flex items-center gap-1">
          <Button variant="secondary" className="h-6 rounded-md px-2" asChild>
            <Link href={`/${pathName.slice(0, pathName.indexOf(name) + 1).join('/')}`}>{name}</Link>
          </Button>
          {idx < renderPathName.length - 1 && <ChevronRightIcon />}
        </li>
      ))}
    </ul>
  )
}
