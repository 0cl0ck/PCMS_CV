import configPromise from '@/payload.config';
import { getPayload } from 'payload';
import { ProductPage } from './ProductPage.client';

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const payload = await getPayload({ config: configPromise });

  const { slug } = await params; // Assurez-vous que params est correctement extrait.

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
