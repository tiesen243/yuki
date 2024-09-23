import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { TableCell, TableRow } from '@yuki/ui/table'

import type { PageProps } from '../_components/data-table'
import { api } from '@/lib/trpc/server'
import { DataTable } from '../_components/data-table'

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  const { products, totalPage } = await api.product.getAll({
    ...searchParams,
    page: Number(searchParams.page) || 1,
  })
  const headers = ['ID', 'Name', 'Category', 'Price', 'Stock', 'Created at', 'Actions']

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

export default Page
