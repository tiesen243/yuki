import Link from 'next/link'

import type { Query } from '@yuki/api'
import { Button } from '@yuki/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from '@yuki/ui/icons'

export const Pagination: React.FC<{ searchParams: Query; totalPage: number }> = ({
  totalPage,
  searchParams,
}) => {
  const page = Number(searchParams.page) || 1
  const prevPage = !page || page <= 1 ? 1 : page - 1
  const nextPage = page && page < totalPage ? page + 1 : totalPage

  return (
    <section className="mt-8 flex items-center justify-center gap-2">
      <Button variant="outline" size="icon" disabled={page === 1}>
        <Link href={{ query: { ...searchParams, page: prevPage } }}>
          <ChevronLeftIcon />
        </Link>
      </Button>

      <span>
        Page {page} of {totalPage}
      </span>

      <Button variant="outline" size="icon" disabled={page === totalPage}>
        <Link href={{ query: { ...searchParams, page: nextPage } }}>
          <ChevronRightIcon />
        </Link>
      </Button>
    </section>
  )
}
