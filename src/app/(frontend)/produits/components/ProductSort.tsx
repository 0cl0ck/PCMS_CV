'use client';

import { useSafeSearchParams } from '@/hooks/useSearchParamsProvider';
import { IconArrowsSort } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'oldest', label: 'Plus anciens' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'Nom A-Z' },
  { value: 'name-desc', label: 'Nom Z-A' },
];

const ProductSort: React.FC = () => {
  const router = useRouter();
  const searchParams = useSafeSearchParams();
  const currentSort = searchParams?.get('sort') || 'newest';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('sort', value);
    router.push(`/produits?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <IconArrowsSort className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="rounded-md border-none bg-transparent text-sm text-neutral-700 focus:ring-0  dark:text-neutral-200"
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

const ProductSortWrapper = () => {
  return (
    <Suspense>
      <ProductSort />
    </Suspense>
  );
};

export default ProductSortWrapper;
export { ProductSort };
