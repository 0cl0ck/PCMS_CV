'use client';

import { ProductCategory } from '@/payload-types';
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

      // Preserve other query parameters
      const newUrl = `/produits${params.toString() ? `?${params.toString()}` : ''}`;
      router.push(newUrl);
    },
    [router, searchParams],
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center rounded-lg px-3 py-2 text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <input
              type="checkbox"
              id={category.id}
              name="category"
              value={category.id}
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary dark:border-neutral-600"
            />
            <label htmlFor={category.id} className="ml-2 flex-1 cursor-pointer text-sm">
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

