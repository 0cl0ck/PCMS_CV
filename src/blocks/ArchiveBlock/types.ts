import type { Post, Product } from '@/payload-types';

export interface ArchiveBlockSelectedDoc {
  relationTo: 'posts' | 'products';
  value: Post | Product;
}

export interface ArchiveBlock {
  id?: string;
  blockType: 'archive';
  introContent?: any;
  populateBy: 'collection' | 'selection';
  relationTo?: 'posts' | 'products';
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
