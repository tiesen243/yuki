import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@yuki/ui/table'

import { api } from '@/lib/trpc/server'

const Page: NextPage = async () => {
  const products = await api.product.getAll({})

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
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
        </TableBody>
      </Table>
    </div>
  )
}

export default Page

const headers = ['ID', 'Name', 'Price', 'Stock', 'Actions']
