import type { NextPage } from 'next'

import type { Query } from '@yuki/api'

interface Props {
  searchParams: Query
}

const Page: NextPage<Props> = ({ searchParams }) => {
  return (
    <div>
      <pre>{JSON.stringify(searchParams, null, 2)}</pre>
    </div>
  )
}

export default Page
