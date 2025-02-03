'use client';

import type { ProductCategory } from '@/payload-types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  categories: ProductCategory[];
  selectedCategories: string[];
};

export const CategoryFilter: React.FC<Props> = ({ categories, selectedCategories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = useCallback(
    (categoryValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentCategories = params.getAll('category');

      if (currentCategories.includes(categoryValue)) {
        // Remove category
        const newCategories = currentCategories.filter((cat) => cat !== categoryValue);
        params.delete('category');
        newCategories.forEach((cat) => params.append('category', cat));
      } else {
        // Add category
        params.append('category', categoryValue);
      }

      router.push(`/produits?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Catégories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <input
              type="checkbox"
              id={category.value}
              checked={selectedCategories.includes(category.value)}
              onChange={() => handleCategoryChange(category.value)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor={category.value} className="ml-2 text-sm">
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
