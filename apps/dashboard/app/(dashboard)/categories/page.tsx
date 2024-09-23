import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@yuki/ui/table'

import { api } from '@/lib/trpc/server'

const Page: NextPage = async () => {
  const cateogries = await api.category.getAll({})

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
        {cateogries.length === 0 && (
          <TableRow className="text-muted-foreground">
            <TableCell align="center" colSpan={headers.length}>
              No cateogries found
            </TableCell>
          </TableRow>
        )}

        {cateogries.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.id}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category._count.products}</TableCell>{' '}
            <TableCell>{category.createdAt.toDateString()}</TableCell>
            <TableCell className="space-x-2">
              <Button size="sm" asChild>
                <Link href={`/cateogries/${category.id}`}>Edit</Link>
              </Button>
              <Button variant="destructive" size="sm" asChild>
                <Link href={`/cateogries/${category.id}/delete`}>Delete</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Page

const headers = ['ID', 'Name', 'Number of Products', 'Created at', 'Actions']
