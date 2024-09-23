import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@yuki/ui/table'

import { api } from '@/lib/trpc/server'

const Page: NextPage = async () => {
  const customers = await api.user.getAll({})

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {customers.length === 0 && (
          <TableRow className="text-muted-foreground">
            <TableCell align="center" colSpan={headers.length}>
              No customers found
            </TableCell>
          </TableRow>
        )}

        {customers.map((customer) => (
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
      </TableBody>
    </Table>
  )
}

export default Page

const headers = ['ID', 'Name', 'Role', 'Joined at', 'Actions']
