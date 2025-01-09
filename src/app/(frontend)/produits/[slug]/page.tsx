import configPromise from '@/payload-config';
import type { Product } from '@/payload-types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import ProductPageClient from './ProductPage.client';

export const dynamic = 'force-static';
export const revalidate = 600;

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const payload = await getPayload({ config: configPromise });

  const product = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    depth: 1,
    limit: 1,
    overrideAccess: false,
    select: {
      id: true,
      name: true,
      price: true,
      productType: true,
      variations: true,
      images: true,
    },
  });

  if (!product.docs.length) {
    return notFound();
  }

  return <ProductPageClient product={product.docs[0] as Product} />;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
