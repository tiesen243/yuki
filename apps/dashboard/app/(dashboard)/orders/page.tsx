import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@yuki/ui/table'

import { api } from '@/lib/trpc/server'

const Page: NextPage = async () => {
  const orders = await api.order.getAll({})

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
        {orders.length === 0 && (
          <TableRow className="text-muted-foreground">
            <TableCell align="center" colSpan={headers.length}>
              No orders found
            </TableCell>
          </TableRow>
        )}
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.user}</TableCell>
            <TableCell>{order.numOfItems}</TableCell>
            <TableCell>{order.total}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.createdAt.toDateString()}</TableCell>
            <TableCell className="space-x-2">
              <Button size="sm" asChild>
                <Link href={`/orders/${order.id}`}>Edit</Link>
              </Button>
              <Button variant="destructive" size="sm" asChild>
                <Link href={`/orders/${order.id}/delete`}>Delete</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Page

const headers = ['ID', 'User', 'Number of Items', 'Total', 'Status', 'Created at', 'Actions']
