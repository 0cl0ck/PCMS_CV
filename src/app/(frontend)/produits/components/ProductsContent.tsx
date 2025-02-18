'use client';

import { ProductGrid } from '@/components/ProductGrid';
import { SearchParamsProvider } from '@/hooks/useSearchParamsProvider';
import { ProductCategory, Product } from '@/payload-types';
import { ProductFilters } from './filters';
import ProductSort from './ProductSort';
import { ResetFiltersButton } from './ResetFiltersButton';

type Props = {
  categories: ProductCategory[];
  products: Product[];
  selectedCategories: string[];
  minPrice: number;
  maxPrice: number;
};

export function ProductsContent({
  categories,
  products,
  selectedCategories,
  minPrice,
  maxPrice,
}: Props) {
  return (
    <SearchParamsProvider>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-24">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="prose dark:prose-invert">
                <h1 className="mb-0">Produits</h1>
              </div>
              <ProductSort />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Sidebar avec les filtres - position fixe sur desktop */}
            <div className="w-full md:w-64 md:flex-shrink-0">
              <div className="sticky top-24">
                <ProductFilters
                  categories={categories}
                  selectedCategories={selectedCategories}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
              </div>
            </div>

            {/* Grille des produits */}
            <div className="flex-1">
              {products.length > 0 ? (
                <ProductGrid products={products} />
              ) : (
                <div className="rounded-lg border bg-background p-6 text-center">
                  <p className="text-muted-foreground">
                    Aucun produit ne correspond à votre sélection.
                  </p>
                  <ResetFiltersButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SearchParamsProvider>
  );
}
