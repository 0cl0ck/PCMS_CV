import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'

interface Variation {
  name: string
  price: number
  id: string
}

interface MediaResource {
  url: string
  id: string
  updatedAt: string
  createdAt: string
}

interface Product {
  name: string
  price: number
  productType: 'simple' | 'variable' // Type du produit (exemple)
  variations?: Variation[] // Optionnel pour les produits simples
  images?: MediaResource[] // Optionnel si pas d'images
  slug: string
}

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { name, price, productType, variations, images, slug } = product

  if (!slug) {
    console.error('Le produit ne possède pas de slug:', product)
    return null // N'affiche rien si le produit n'a pas de slug
  }

  const minPrice =
    productType === 'variable' && variations ? Math.min(...variations.map((v) => v.price)) : price

  return (
    <Link href={`/produits/${slug}`}>
      <div className="relative w-full">
        {images && images.length > 0 ? (
          <Media resource={images[0]} size="33vw" />
        ) : (
          <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-500">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="prose">
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          {productType === 'variable' ? <p>À partir de {minPrice} €</p> : <p>{price} €</p>}
        </div>
      </div>
    </Link>
  )
}
