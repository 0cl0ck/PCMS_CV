import configPromise from '@/payload.config';
import { Metadata } from 'next';
import { getPayload } from 'payload';
import { ProductPage } from './ProductPage.client';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: Props) {
  const payload = await getPayload({ config: configPromise });

  const { slug } = params;

  const product = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
  });

  if (!product.docs || product.docs.length === 0) {
    return <h1>Produit introuvable</h1>;
  }

  return <ProductPage product={product.docs[0]} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise });
  const { slug } = params;

  const product = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!product.docs || product.docs.length === 0) {
    return {
      title: 'Produit introuvable',
    };
  }

  const productData = product.docs[0];

  return {
    title: productData.name,
    description: productData.meta?.description || undefined,
  };
}

