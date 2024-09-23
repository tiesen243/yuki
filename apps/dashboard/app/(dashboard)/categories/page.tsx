import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { TableCell, TableRow } from '@yuki/ui/table'

import type { PageProps } from '../_components/data-table'
import { api } from '@/lib/trpc/server'
import { DataTable } from '../_components/data-table'

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  const { categories, totalPage } = await api.category.getAll({
    q: searchParams.q,
    page: Number(searchParams.page) || 1,
  })
  const headers = ['ID', 'Name', 'Number of Products', 'Created at', 'Actions']

  return (
    <DataTable
      caption="Categories"
      headers={headers}
      totalPage={totalPage}
      searchParams={searchParams}
    >
      {categories.length === 0 && (
        <TableRow className="text-muted-foreground">
          <TableCell align="center" colSpan={headers.length}>
            No cateogries found
          </TableCell>
        </TableRow>
      )}

      {categories.map((category) => (
        <TableRow key={category.id}>
          <TableCell>{category.id}</TableCell>
          <TableCell>{category.name}</TableCell>
          <TableCell>{category._count.products}</TableCell>{' '}
          <TableCell>{category.createdAt.toDateString()}</TableCell>
          <TableCell className="space-x-2">
            <Button size="sm" asChild>
              <Link href={`/categories/${category.id}`}>Edit</Link>
            </Button>
            <Button variant="destructive" size="sm" asChild>
              <Link href={`/categories/${category.id}/delete`}>Delete</Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </DataTable>
  )
}

export default Page
