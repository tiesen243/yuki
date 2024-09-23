import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { TableCell, TableRow } from '@yuki/ui/table'

import type { PageProps } from '../_components/data-table'
import { api } from '@/lib/trpc/server'
import { DataTable } from '../_components/data-table'

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  const { users, totalPage } = await api.user.getAll({
    q: searchParams.q,
    page: Number(searchParams.page) || 1,
  })
  const headers = ['ID', 'Name', 'Role', 'Created at', 'Actions']

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
              <Link href={`/customers/${customer.id}`}>Edit</Link>
            </Button>
            <Button variant="destructive" size="sm" asChild>
              <Link href={`/customers/${customer.id}/delete`}>Delete</Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  )
}

export default Page
