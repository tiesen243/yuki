'use client'

import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { TableCell, TableRow } from '@yuki/ui/table'

import type { PageProps } from '@/app/(dashboard)/_components/data-table'
import { DataTable } from '@/app/(dashboard)/_components/data-table'
import { api } from '@/lib/trpc/react'

export const PageClient: React.FC<PageProps> = ({ searchParams }) => {
  const headers = ['ID', 'Name', 'Category', 'Price', 'Stock', 'Created at', 'Actions']
  const [{ products, totalPage }] = api.product.getAll.useSuspenseQuery({
    ...searchParams,
    page: Number(searchParams.page) || 1,
  })

  return (
    <DataTable
      caption="Products"
      headers={headers}
      totalPage={totalPage}
      searchParams={searchParams}
    >
      {products.length === 0 && (
        <TableRow className="text-muted-foreground">
          <TableCell align="center" colSpan={headers.length}>
            No products found
          </TableCell>
        </TableRow>
      )}

      {products.map((product) => (
        <TableRow key={product.id}>
          <TableCell>{product.id}</TableCell>
          <TableCell>{product.name}</TableCell>
          <TableCell>{product.category.name}</TableCell>
          <TableCell>{product.price}</TableCell>
          <TableCell>{product.stock}</TableCell>
          <TableCell>{product.createdAt.toDateString()}</TableCell>
          <TableCell className="space-x-2">
            <Button size="sm" asChild>
              <Link href={`/products/${product.id}`}>Edit</Link>
            </Button>
            <Button variant="destructive" size="sm" asChild>
              <Link href={`/products/${product.id}/delete`}>Delete</Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  )
}
