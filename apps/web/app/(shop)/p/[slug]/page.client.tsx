'use client'

import { api } from '@/lib/trpc/react'
import { ProductComments } from './_components/product-comments'
import { ProductCommentsSkeleton } from './_components/product-comments/product-comment.skeleton'
import { ProductDetail } from './_components/product-detail'
import { ProductDetailSkeleton } from './_components/product-detail.skeleton'
import { ProductOwner } from './_components/product-owner'
import { ProductOwnerSkeleton } from './_components/product-owner.skeleton'
import { RelatedProducts } from './_components/related-products'
import { RelatedProductsSkeleton } from './_components/related-products.skeleton'

export const PageClient: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = api.product.getOne.useQuery({ id })

  if (isLoading || !data)
    return (
      <>
        <ProductDetailSkeleton />
        <ProductOwnerSkeleton />
        <ProductCommentsSkeleton />
        <RelatedProductsSkeleton />
      </>
    )

  return (
    <>
      <ProductDetail product={data.product} />
      <ProductOwner owner={data.product.owner} />
      <ProductComments id={id} avgStars={data.avgStars} comments={data.product.comments} />
      <RelatedProducts products={data.relatedProducts} />
    </>
  )
}
