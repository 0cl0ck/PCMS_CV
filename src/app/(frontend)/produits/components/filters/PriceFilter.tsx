'use client';

import { IconCurrencyEuro } from '@tabler/icons-react';
import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  minPrice: number;
  maxPrice: number;
};

export const PriceFilter: React.FC<Props> = ({ minPrice, maxPrice }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (min === minPrice && max === maxPrice) {
        params.delete('minPrice');
        params.delete('maxPrice');
      } else {
        params.set('minPrice', min.toString());
        params.set('maxPrice', max.toString());
      }

      router.push(`/produits?${params.toString()}`);
    },
    [router, searchParams, minPrice, maxPrice],
  );

  const currentMinPrice = Number(searchParams.get('minPrice')) || minPrice;
  const currentMaxPrice = Number(searchParams.get('maxPrice')) || maxPrice;

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <IconCurrencyEuro className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
        <h2 className="text-lg font-semibold">Prix</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={currentMinPrice}
            onChange={(e) => handlePriceChange(Number(e.target.value), currentMaxPrice)}
            className="w-full"
          />
          <span className="w-16 text-sm">{currentMinPrice}€</span>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={currentMaxPrice}
            onChange={(e) => handlePriceChange(currentMinPrice, Number(e.target.value))}
            className="w-full"
          />
          <span className="w-16 text-sm">{currentMaxPrice}€</span>
        </div>
      </div>
    </div>
  );
};
