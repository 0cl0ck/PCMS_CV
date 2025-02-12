import type { Product } from '@/payload-types';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const useProductFilters = (products: Product[]) => {
  const searchParams = useSearchParams();

  return useMemo(() => {
    let filteredProducts = [...products];

    // Filtre par catégories
    const selectedCategories = searchParams.getAll('category');
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category?.some((category) =>
          selectedCategories.includes(typeof category === 'string' ? category : category.value),
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
    function extractText(description: Product['description']): string {
      if (!description || !description.root?.children) return ''; // Si description est vide, retourner une chaîne vide
      return description.root.children
        .map((child) => ('text' in child ? child.text : ''))
        .join(' ')
        .trim(); // Concaténer le texte et supprimer les espaces inutiles
    }

    const searchTerm = searchParams.get('search')?.toLowerCase();

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) => {
        const descriptionText = extractText(product.description);
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          descriptionText.toLowerCase().includes(searchTerm)
        );
      });
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

