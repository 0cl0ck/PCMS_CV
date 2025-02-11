'use client';

import { IconArrowsSort } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';

const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'oldest', label: 'Plus anciens' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'Nom A-Z' },
  { value: 'name-desc', label: 'Nom Z-A' },
];

export const ProductSort: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'newest';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/produits?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <IconArrowsSort className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-neutral-700 dark:bg-neutral-800"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
