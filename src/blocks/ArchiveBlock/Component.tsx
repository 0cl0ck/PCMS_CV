import type { Post, Product, ProductCategory } from '@/payload-types';
import type { ArchiveBlockSelectedDoc, ArchiveBlock as ArchiveBlockType } from './types';

import RichText from '@/components/RichText';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import React from 'react';

import { CollectionArchive } from '@/components/CollectionArchive';
import { ProductCategoryGrid } from '@/components/ProductCategoryGrid';
import { ProductGrid } from '@/components/ProductGrid';

export const ArchiveBlock: React.FC<ArchiveBlockType> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo = 'posts',
  } = props;

  const limit = limitFromProps || 3;
  const payload = await getPayload({ config: configPromise });

  let posts: Post[] = [];
  let products: Product[] = [];
  let categories_list: ProductCategory[] = [];

  if (populateBy === 'collection') {
    if (relationTo === 'posts') {
      const flattenedCategories = categories?.map((category) => {
        if (typeof category === 'object') return category.id;
        return category;
      });

      const fetchedPosts = await payload.find({
        collection: 'posts',
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      });

      posts = fetchedPosts.docs;
    } else if (relationTo === 'products') {
      const flattenedCategories = categories?.map((category) => {
        if (typeof category === 'object') return category.id;
        return category;
      });

      const fetchedProducts = await payload.find({
        collection: 'products',
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                category: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      });

      products = fetchedProducts.docs;
    } else if (relationTo === 'product-categories') {
      const fetchedCategories = await payload.find({
        collection: 'product-categories',
        depth: 1,
        limit,
        sort: 'sort',
      });

      categories_list = fetchedCategories.docs as ProductCategory[];
    }
  } else if (selectedDocs?.length) {
    selectedDocs.forEach((doc: ArchiveBlockSelectedDoc) => {
      if (typeof doc.value === 'object') {
        if (doc.relationTo === 'posts') {
          posts.push(doc.value as Post);
        } else if (doc.relationTo === 'products') {
          products.push(doc.value as Product);
        } else if (doc.relationTo === 'product-categories') {
          categories_list.push(doc.value as ProductCategory);
        }
      }
    });
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16 flex justify-center">
          <RichText
            className="flex justify-center flex-col items-center m-0 max-w-[48rem]"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}
      {relationTo === 'posts' ? (
        <CollectionArchive posts={posts} />
      ) : relationTo === 'products' ? (
        <ProductGrid products={products} />
      ) : (
        <ProductCategoryGrid categories={categories_list} />
      )}
    </div>
  );
};
