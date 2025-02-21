import { ProductCategory } from '@/payload-types';
import React from 'react';
import { FocusCards } from '../ui/focus-cards';

interface ProductCategoryGridProps {
  categories: ProductCategory[];
}

export const ProductCategoryGrid: React.FC<ProductCategoryGridProps> = ({ categories }) => {
  const cards = categories.map((category) => ({
    title: category.name,
    src: typeof category.image === 'object' ? category.image.url : '',
    href: `/produits?category=${category.id}`,
  }));

  return (
    <div className="container">
      <FocusCards cards={cards} />
    </div>
  );
};
