import type { Post, Product, ProductCategory } from '@/payload-types';
import type { ArchiveBlockSelectedDoc, ArchiveBlock as ArchiveBlockType } from './types';

import RichText from '@/components/RichText';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import React from 'react';

import { CollectionArchive } from '@/components/CollectionArchive';
import { ProductCategoryGrid } from '@/components/ProductCategoryGrid';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductPromoGrid } from '@/components/ProductPromoGrid';

export const ArchiveBlock: React.FC<ArchiveBlockType> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo = 'posts',
    blockName,
    blockType,
  } = props;

  console.log('ArchiveBlock props:', {
    id,
    populateBy,
    relationTo,
    categories: categories || [],
    blockName: blockName || 'unnamed',
    blockType: blockType || 'unknown',
  });

  const limit = limitFromProps || 3;
  const payload = await getPayload({ config: configPromise });

  let posts: Post[] = [];
  let products: Product[] = [];
  let categories_list: ProductCategory[] = [];

  let usePromoGrid = false;

  const blockNameLower = typeof blockName === 'string' ? blockName.toLowerCase() : '';
  const blockTypeLower = typeof blockType === 'string' ? blockType.toLowerCase() : '';

  if (blockNameLower.includes('promo') || blockTypeLower.includes('promo')) {
    console.log('Using PromoGrid because block name/type indicates promotions');
    usePromoGrid = true;
  }

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

      const allCategories = await payload.find({
        collection: 'product-categories',
        depth: 1,
        limit: 100,
      });

      const promotionsCategory = allCategories.docs.find(
        (c) =>
          typeof c.name === 'string' &&
          (c.name.toLowerCase() === 'promotions' || c.name.toLowerCase() === 'promotion'),
      );

      if (promotionsCategory) {
        console.log('Found promotions category with ID:', promotionsCategory.id);
      }

      let query = {};

      if (flattenedCategories && flattenedCategories.length > 0) {
        query = {
          where: {
            category: {
              in: flattenedCategories,
            },
          },
        };
      }

      if (
        usePromoGrid &&
        (!flattenedCategories || flattenedCategories.length === 0) &&
        promotionsCategory
      ) {
        query = {
          where: {
            category: {
              in: [promotionsCategory.id],
            },
          },
        };
        console.log('Querying for promotion products specifically:', promotionsCategory.id);
      }

      const fetchedProducts = await payload.find({
        collection: 'products',
        depth: 1,
        limit,
        ...query,
      });

      products = fetchedProducts.docs;

      if (!usePromoGrid && promotionsCategory && flattenedCategories) {
        if (
          flattenedCategories.length === 1 &&
          (flattenedCategories[0] === promotionsCategory.id ||
            String(flattenedCategories[0]) === String(promotionsCategory.id))
        ) {
          console.log('Using PromoGrid - ONLY the Promotions category is selected');
          usePromoGrid = true;
        }
      }

      if (!usePromoGrid && products.length > 0 && promotionsCategory) {
        const promoProducts = products.filter((product) => {
          if (product.category && Array.isArray(product.category)) {
            return product.category.some((cat) => {
              const catId = typeof cat === 'object' ? cat.id : cat;
              return (
                catId === promotionsCategory.id || String(catId) === String(promotionsCategory.id)
              );
            });
          }
          return false;
        });

        if (promoProducts.length === products.length && promoProducts.length > 0) {
          console.log('Using PromoGrid - ALL products belong to Promotions category');
          usePromoGrid = true;
        }
      }

      console.log('Final usePromoGrid decision:', usePromoGrid);
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
    const hasPromotionProductsOnly = selectedDocs.every((doc) => {
      if (doc.relationTo === 'products' && typeof doc.value === 'object') {
        const product = doc.value as Product;
        const productName = product.name?.toLowerCase() || '';
        return productName.includes('promo');
      }
      return false;
    });

    if (hasPromotionProductsOnly && selectedDocs.length > 0) {
      console.log('Using PromoGrid - Selected docs are all promotion products');
      usePromoGrid = true;
    }

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

  console.log('Products to display:', products.length);

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
        usePromoGrid ? (
          <ProductPromoGrid products={products} />
        ) : (
          <ProductGrid products={products} />
        )
      ) : (
        <ProductCategoryGrid categories={categories_list} />
      )}
    </div>
  );
};

