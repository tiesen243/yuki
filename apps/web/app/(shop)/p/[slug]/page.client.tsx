'use client'

import { api } from '@/lib/trpc/react'
import { ProductComments } from './_components/product-comments'
import { ProductDetail } from './_components/product-detail'
import { ProductOwner } from './_components/product-owner'
import { RelatedProducts } from './_components/related-products'

export const PageClient: React.FC<{ id: string }> = ({ id }) => {
  const [{ product, avgStars, relatedProducts }] = api.product.getOne.useSuspenseQuery({ id })

  return (
    <>
      <ProductDetail product={product} />
      <ProductOwner owner={product.owner} />
      <ProductComments id={product.id} avgStars={avgStars} comments={product.comments} />
      <RelatedProducts products={relatedProducts} />
    </>
  )
}
