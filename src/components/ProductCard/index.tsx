import React from 'react'
import { Media } from '@/components/Media'

export const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const { name, price, productType, variations, images } = product

  const minPrice = productType === 'variable' ? Math.min(...variations.map((v: any) => v.price)) : price

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer">
      <div className="relative w-full">
        {images && images.length > 0 ? (
          <Media resource={images[0]} size="33vw" />
        ) : (
          <div className="">No image</div>
        )}
      </div>
      <div className="p-4">
        <div className="prose">
          <h3>{name}</h3>
        </div>
        <div className="mt-2">
          {productType === 'variable' ? (
            <p>À partir de {minPrice} €</p>
          ) : (
            <p>{price} €</p>
          )}
        </div>
      </div>
    </div>
  )
}
