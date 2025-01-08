// import type { Metadata } from 'next/types'
import configPromise from '@payload-config';
import { getPayload } from 'payload';
// import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image';

interface ProductProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Variation {
  name: string;
  price: number;
  id: string;
}

export default async function Page({ params }: ProductProps) {
  // Attendez explicitement params pour extraire slug
  const { slug } = await params;

  if (!slug) {
    return <div>Produit non trouvé</div>;
  }

  // Chargez l'instance Payload
  const payload = await getPayload({ config: configPromise });

  // Requête pour récupérer les données du produit
  const productData = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const product = productData.docs[0];

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  // Affichage du produit
  return (
    <div className="pt-24 pb-24">
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {product.images?.[0] &&
          typeof product.images[0] === 'object' &&
          'url' in product.images[0] &&
          product.images[0].url && (
            <Image
              src={product.images[0].url}
              alt={product.name}
              className="mb-4 w-full max-w-md"
              width={500}
              height={500}
              priority
            />
          )}
        {product.variations ? (
          <ul className="mb-4">
            {product.variations.map((variation: Variation, index: number) => (
              <li key={index}>
                {variation.name} - {variation.price} €
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4">Prix: {product.price} €</p>
        )}
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Ajouter au panier</button>
      </div>
    </div>
  );
}
