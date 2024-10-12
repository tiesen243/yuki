'use client'

import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { TableCell, TableRow } from '@yuki/ui/table'

import type { PageProps } from '@/app/(dashboard)/_components/data-table'
import { DataTable } from '@/app/(dashboard)/_components/data-table'
import { api } from '@/lib/trpc/react'

export const PageClient: NextPage<PageProps> = ({ searchParams }) => {
  const headers = ['ID', 'User', 'Number of Items', 'Total', 'Status', 'Created at', 'Actions']
  const [{ orders, totalPage }] = api.order.getAll.useSuspenseQuery({
    q: searchParams.q,
    page: Number(searchParams.page) || 1,
  })

  return (
    <DataTable caption="Orders" headers={headers} totalPage={totalPage} searchParams={searchParams}>
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
              <Link href={`/orders/${order.id}`}>View</Link>
            </Button>
            <Button variant="destructive" size="sm" asChild>
              <Link href={`/orders/${order.id}/delete`}>Delete</Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  )
}
