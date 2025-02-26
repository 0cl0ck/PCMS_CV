import type {
  ArchiveBlock as ArchiveBlockType,
  Post,
  Product,
  ProductCategory,
} from '@/payload-types';

export interface ArchiveBlockSelectedDoc {
  relationTo: 'posts' | 'products' | 'product-categories';
  value: Post | Product | ProductCategory;
}

export interface ArchiveBlock extends Omit<ArchiveBlockType, 'selectedDocs'> {
  selectedDocs?: ArchiveBlockSelectedDoc[];
}
