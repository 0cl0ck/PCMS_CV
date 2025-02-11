import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Product } from '@/payload-types';

export const useProductFilters = (products: Product[]) => {
  const searchParams = useSearchParams();

  return useMemo(() => {
    let filteredProducts = [...products];

    // Filtre par catégories
    const selectedCategories = searchParams.getAll('category');
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.categories?.some((category) =>
          selectedCategories.includes(category.value),
        ),
      );
    }

    // Filtre par prix
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.price;
        if (!price) return false;
        
        if (minPrice && price < Number(minPrice)) return false;
        if (maxPrice && price > Number(maxPrice)) return false;
        
        return true;
      });
    }

    // Filtre par recherche
    const searchTerm = searchParams.get('search')?.toLowerCase();
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm),
      );
    }

    return {
      filteredProducts,
      totalProducts: filteredProducts.length,
      filters: {
        categories: selectedCategories,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        search: searchTerm,
      },
    };
  }, [products, searchParams]);
};
