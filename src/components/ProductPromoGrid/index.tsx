'use client';

import { GlareCard } from '@/components/GlareCard';
import { Media } from '@/components/Media';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/payload-types';
import Link from 'next/link';
import React from 'react';

type Props = {
  products: Product[];
};

export const ProductPromoGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className="container mx-auto px-4">
      {/* Utiliser flexbox plutôt que grid pour un meilleur contrôle du centrage */}
      <div className="flex flex-wrap justify-center gap-8">
        {products?.map((product, index) => {
          const { name, slug, meta: _meta } = product;

          const media = product.images?.[0] || undefined;
          const productHref = `/produits/${slug}`;

          return (
            <Link key={index} href={productHref} className="no-underline">
              <GlareCard className="p-0 overflow-hidden">
                <div className="relative h-full flex flex-col">
                  <div className="relative aspect-[17/14] w-full">
                    <Media
                      resource={media}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      priority={index < 3}
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 to-black/40">
                    <h4 className="text-lg font-bold text-white mb-2">{name}</h4>
                    <div className=" mt-auto">
                      <p className="text-green-300 font-bold">
                        {product?.price ? formatPrice(product.price) : 'Prix non disponible'}
                      </p>
                      <div className="flex justify-center">
                        <span className="inline-flex justify-center items-center w-fit bg-green-500 text-white text-sm px-2 py-1 rounded mt-2">
                          Promotion
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlareCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

