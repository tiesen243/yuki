'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@yuki/ui/breadcrumb'

export const NavLink: React.FC = () => {
  const pathNames = usePathname().split('/').filter(Boolean)

  return (
    <Breadcrumb className="capitalize">
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathNames.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}

        {pathNames.slice(0, -1).map((path) => (
          <Fragment key={path}>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link href={`/${pathNames.slice(0, pathNames.indexOf(path) + 1).join('/')}`}>
                  {path.replace('-', ' ')}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="hidden md:block" />
          </Fragment>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage>{pathNames.at(-1)?.replace('-', ' ')}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
