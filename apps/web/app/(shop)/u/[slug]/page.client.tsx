'use client'

import type { Query } from '@yuki/api'

import { Pagination } from '@/app/(shop)/_components/pagination'
import { api } from '@/lib/trpc/react'
import { UserDetails } from './_components/user-details'
import { UserProducts } from './_components/user-products'

export const PageClient: React.FC<{ id: string; searchParams: Query }> = ({ id, searchParams }) => {
  const [{ user, rating, products, totalPage }] = api.user.getOne.useSuspenseQuery({
    id,
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 10,
  })

  return (
    <>
      <UserDetails user={user} rating={rating} />
      <UserProducts name={user.name} products={products} />
      <Pagination searchParams={searchParams} totalPage={totalPage} />
    </>
  )
}
