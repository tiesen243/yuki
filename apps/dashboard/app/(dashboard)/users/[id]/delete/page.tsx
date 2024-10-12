import type { NextPage } from 'next'

interface Props {
  params: { id: string }
}

const Page: NextPage<Props> = ({ params }) => {
  return <div>Page {params.id}</div>
}
export default Page
