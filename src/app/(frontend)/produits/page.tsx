import type { Metadata } from 'next/types';
import { headers } from 'next/headers';
import { getPayload } from 'payload';
import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import configPromise from '@payload-config';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Use headers to make the page dynamic
  headers();
  
  const payload = await getPayload({ config: configPromise });

  // Get selected categories from URL
  const categoryParam = searchParams.category;
  const selectedCategories = categoryParam
    ? Array.isArray(categoryParam)
      ? categoryParam
      : [categoryParam]
    : [];

  console.log('Selected categories:', selectedCategories);

  // Fetch categories
  const categories = await payload.find({
    collection: 'product-categories',
    sort: 'sort',
    limit: 100,
  });

  console.log('Available categories:', categories.docs);

  // Fetch products with category filter if selected
  const products = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 100,
    where: selectedCategories.length > 0
      ? {
          and: [
            {
              'category.value': {
                in: selectedCategories,
              },
            },
            {
              _status: {
                equals: 'published',
              },
            },
          ],
        }
      : {
          _status: {
            equals: 'published',
          },
        },
  });

  console.log('Found products:', products.docs);

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Produits</h1>
        </div>
      </div>

      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <CategoryFilter
                categories={categories.docs}
                selectedCategories={selectedCategories}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.docs.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {products.docs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucun produit trouvé pour cette sélection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Produits`,
  };
}
