import { Media } from '@/components/Media';
import { Product } from '@/payload-types';
import Link from 'next/link';
import React from 'react';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="container">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link href={`/produits/${product.slug}`} key={product.id}>
            <CardContainer className="inter-var" containerClassName="py-10">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl py-4 px-6 border">
                <CardItem translateZ="100" className="w-full relative">
                  {product.images && product.images.length > 0 ? (
                    <Media
                      resource={product.images[0]}
                      className="rounded-xl object-cover w-full h-full"
                      size="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 rounded-xl">
                      No image
                    </div>
                  )}
                </CardItem>

                <CardItem translateZ="50" className="mt-4">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                </CardItem>

                <CardItem translateZ="60" className="mt-2">
                  {product.productType === 'variable' && product.variations ? (
                    <p className="text-neutral-500 text-sm">
                      À partir de {Math.min(...product.variations.map((v) => v.price))} €
                    </p>
                  ) : (
                    <p className="text-neutral-500 text-sm">
                      {product.price ?? 'Prix non défini'} €
                    </p>
                  )}
                </CardItem>
              </CardBody>
            </CardContainer>
          </Link>
        ))}
      </div>
    </div>
  );
};
