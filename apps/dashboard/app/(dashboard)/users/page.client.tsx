'use client'

import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { TableCell, TableRow } from '@yuki/ui/table'

import type { PageProps } from '@/app/(dashboard)/_components/data-table'
import { DataTable } from '@/app/(dashboard)/_components/data-table'
import { api } from '@/lib/trpc/react'

export const PageClient: React.FC<PageProps> = ({ searchParams }) => {
  const headers = ['ID', 'Name', 'Role', 'Created at', 'Actions']
  const [{ users, totalPage }] = api.user.getAll.useSuspenseQuery({
    q: searchParams.q,
    page: Number(searchParams.page) || 1,
  })

  return (
    <DataTable
      caption="Customers"
      headers={headers}
      totalPage={totalPage}
      searchParams={searchParams}
    >
      {users.length === 0 && (
        <TableRow className="text-muted-foreground">
          <TableCell align="center" colSpan={headers.length}>
            No customers found
          </TableCell>
        </TableRow>
      )}

      {users.map((customer) => (
        <TableRow key={customer.id}>
          <TableCell>{customer.id}</TableCell>
          <TableCell>{customer.name}</TableCell>
          <TableCell>{customer.role}</TableCell>
          <TableCell>{customer.createdAt.toDateString()}</TableCell>
          <TableCell className="space-x-2">
            <Button size="sm" asChild>
              <Link href={`/users/${customer.id}`}>Edit</Link>
            </Button>
            <Button variant="destructive" size="sm" asChild>
              <Link href={`/users/${customer.id}/delete`}>Delete</Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  )
}
