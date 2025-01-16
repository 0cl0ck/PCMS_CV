import type { Post, Product } from '@/payload-types';
import type { ArchiveBlockSelectedDoc, ArchiveBlock as ArchiveBlockType } from './types';

import RichText from '@/components/RichText';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import React from 'react';

import { CollectionArchive } from '@/components/CollectionArchive';
import { ProductGrid } from '@/components/ProductGrid';

export const ArchiveBlock: React.FC<ArchiveBlockType> = async (props) => {
  const {
    id,
    categories,
    productCategories,
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
      const flattenedCategories = productCategories?.map((category) => {
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
    }
  } else if (selectedDocs?.length) {
    selectedDocs.forEach((doc: ArchiveBlockSelectedDoc) => {
      if (typeof doc.value === 'object') {
        if (doc.relationTo === 'posts') {
          posts.push(doc.value as Post);
        } else if (doc.relationTo === 'products') {
          products.push(doc.value as Product);
        }
      }
    });
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ml-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      {relationTo === 'posts' ? (
        <CollectionArchive posts={posts} />
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};
