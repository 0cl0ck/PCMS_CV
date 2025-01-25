import type { Post, Product, ProductCategory } from '@/payload-types';

export interface ArchiveBlockSelectedDoc {
  relationTo: 'posts' | 'products' | 'product-categories';
  value: Post | Product | ProductCategory;
}

export interface ArchiveBlock {
  id?: string;
  blockType: 'archive';
  introContent?: any;
  populateBy: 'collection' | 'selection';
  relationTo?: 'posts' | 'products' | 'product-categories';
  categories?: Array<{
    id: string;
    [key: string]: any;
  }>;
  productCategories?: Array<{
    id: string;
    [key: string]: any;
  }>;
  limit?: number;
  selectedDocs?: ArchiveBlockSelectedDoc[];
}
