import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@yuki/ui/table'

export const DataTable: React.FC<Props> = ({
  caption,
  headers,
  totalPage,
  searchParams,
  children,
}) => {
  const page = Number(searchParams.page) || 1
  const nextPage = page === totalPage ? totalPage : page + 1
  const prevPage = page === 1 ? 1 : page - 1

  return (
    <Table>
      <TableCaption className="pb-4">{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index} className="whitespace-nowrap">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="[&>*]:whitespace-nowrap">{children}</TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>
            <form>
              <Input name="q" placeholder="Search" defaultValue={searchParams.q} />
            </form>
          </TableCell>

          <TableCell colSpan={headers.length - 2}>
            <div className="flex items-center justify-end gap-4">
              <Link href={{ query: { page: prevPage } }}>
                <Button size="icon" variant="outline" disabled={page === 1 || totalPage === 1}>
                  <ChevronLeftIcon />
                </Button>
              </Link>

              <span>
                {searchParams.page ?? 1} / {totalPage}
              </span>

              <Link href={{ query: { page: nextPage } }}>
                <Button
                  size="icon"
                  variant="outline"
                  disabled={page === totalPage || totalPage === 1}
                >
                  <ChevronRightIcon />
                </Button>
              </Link>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

interface Props extends PageProps {
  caption: string
  headers: string[]
  totalPage: number
  children: Readonly<React.ReactNode>
}

export interface PageProps {
  searchParams: { q?: string; page?: number }
}
