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

export interface PageProps {
  searchParams: { q?: string; page?: number }
}

export const DataTable: React.FC<Props> = ({
  caption,
  headers,
  totalPage,
  searchParams,
  children,
}) => (
  <Table>
    <TableCaption>{caption}</TableCaption>
    <TableHeader>
      <TableRow>
        {headers.map((header, index) => (
          <TableHead key={index}>{header}</TableHead>
        ))}
      </TableRow>
    </TableHeader>

    <TableBody>{children}</TableBody>

    <TableFooter>
      <TableRow>
        <TableCell colSpan={2}>
          <form>
            <Input name="q" placeholder="Search" defaultValue={searchParams.q} />
          </form>
        </TableCell>

        <TableCell colSpan={headers.length - 2}>
          <div className="flex items-center justify-end gap-4">
            <Button
              size="icon"
              variant="outline"
              disabled={searchParams.page === 1 || !searchParams.page}
              asChild
            >
              <Link href={{ query: { page: Number(searchParams.page) - 1 } }}>
                <ChevronLeftIcon />
              </Link>
            </Button>

            <span>
              {searchParams.page ?? 1} / {totalPage}
            </span>

            <Button
              size="icon"
              variant="outline"
              disabled={searchParams.page === totalPage || totalPage === 1}
              asChild
            >
              <Link href={{ query: { page: Number(searchParams.page) + 1 } }}>
                <ChevronRightIcon />
              </Link>
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
)

interface Props {
  caption: string
  headers: string[]
  totalPage: number
  searchParams: { q?: string; page?: number }
  children: Readonly<React.ReactNode>
}
