import { Media } from '@/components/Media';
import type { Media as MediaType } from '@/payload-types';
import Link from 'next/link';
import React from 'react';

interface Variation {
  name: string;
  price: number;
  id?: string | null;
  stock?: number | null;
}

interface Product {
  name: string;
  price?: number | null;
  productType: 'simple' | 'variable';
  variations?: Variation[] | null;
  images?: (MediaType | string)[];
  slug?: string | null;
  id: string;
}

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { name, price, productType, variations, images, slug } = product;

  if (!slug) {
    console.error('Le produit ne possède pas de slug:', product);
    return null; // N'affiche rien si le produit n'a pas de slug
  }

  const minPrice =
    productType === 'variable' && variations ? Math.min(...variations.map((v) => v.price)) : price;

  return (
    <Link href={`/produits/${slug}`}>
      <div className="relative w-full">
        {images && images.length > 0 ? (
          <Media resource={images[0]} sizes="33vw" />
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
          {productType === 'variable' ? (
            <p>À partir de {minPrice || 'Non défini'} €</p>
          ) : (
            <p>{price ?? 'Prix non défini'} €</p>
          )}
        </div>
      </div>
    </Link>
  );
};
