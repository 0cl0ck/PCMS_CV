'use client';

import { Product } from '@/payload-types';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
};

export const ProductGrid: React.FC<Props> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center text-center">
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Aucun produit trouvé
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
