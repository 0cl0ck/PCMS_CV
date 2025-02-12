'use client';

import { ProductCategory } from '@/payload-types';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import SearchFilter from './SearchFilter';

type Props = {
  categories: ProductCategory[];
  selectedCategories: string[];
  minPrice: number;
  maxPrice: number;
};

export const ProductFilters: React.FC<Props> = ({
  categories,
  selectedCategories,
  minPrice,
  maxPrice,
}) => {
  return (
    <div className="w-full rounded-lg border bg-background p-6">
      <div className="space-y-6">
        <div>
          <h2 className="mb-2 text-lg font-semibold tracking-tight">Rechercher</h2>
          <SearchFilter />
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold tracking-tight">Catégories</h2>
          <CategoryFilter categories={categories} selectedCategories={selectedCategories} />
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold tracking-tight">Prix</h2>
          <PriceFilter minPrice={minPrice} maxPrice={maxPrice} />
        </div>
      </div>
    </div>
  );
};

