'use client';

import { IconSearch } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

export const SearchFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const debouncedSearch = useDebounce(searchTerm, 300);

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (!value) {
        params.delete('search');
      } else {
        params.set('search', value);
      }

      router.push(`/produits?${params.toString()}`);
    },
    [router, searchParams],
  );

  // Mettre à jour l'URL lorsque la recherche debounced change
  useCallback(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <IconSearch className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
        <h2 className="text-lg font-semibold">Rechercher</h2>
      </div>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-neutral-700 dark:bg-neutral-800"
        />
        <IconSearch className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      </div>
    </div>
  );
};
