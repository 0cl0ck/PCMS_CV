import type { Metadata } from 'next/types'

import { getPayload } from 'payload'
import React from 'react'
import { ProductCard } from '@/components/ProductCard'
import configPromise from '@payload-config'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      name: true,
      description: true,
      price: true,
      productType: true,
      variations: true,
      images: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Produits</h1>
        </div>
      </div>

      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.docs.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Produits`,
  }
}
