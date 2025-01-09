import { ImageMedia } from '@/components/Media/ImageMedia';
import { CartContext } from '@/providers/Cart/CartContext';
import configPromise from '@payload-config';
import { useRouter } from 'next/router';
import { getPayload } from 'payload';
import React, { useContext, useState } from 'react';

export const dynamic = 'force-static';
export const revalidate = 600;

type Variation = {
  id: string;
  name: string;
  price: number;
};

type Product = {
  id: string;
  name: string;
  price: number;
  productType: 'simple' | 'variable';
  variations?: Variation[];
  images: { url: string }[];
};

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function getServerSideProps({ params }: ProductPageProps) {
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
      name: true,
      price: true,
      productType: true,
      variations: true,
      images: true,
    },
  });

  if (!product.docs.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: product.docs[0],
    },
  };
}

const ProductPage: React.FC<{ product: Product }> = ({ product }) => {
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const [quantity, setQuantity] = useState(1);
  const cartContext = useContext(CartContext);
  const router = useRouter();

  if (!cartContext) return null;

  const { addToCart } = cartContext;

  const handleAddToCart = () => {
    if (selectedVariation || product.productType === 'simple') {
      addToCart(product, selectedVariation, quantity);
      router.push('/panier');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          {product.images && product.images.length > 0 ? (
            <ImageMedia resource={product.images[0].url} size="50vw" />
          ) : (
            <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-500">
              No image
            </div>
          )}
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          {product.productType === 'variable' && product.variations ? (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Variations</h2>
              <div className="flex flex-wrap">
                {product.variations.map((variation) => (
                  <button
                    key={variation.id}
                    className={`border rounded px-4 py-2 mr-2 mb-2 ${
                      selectedVariation?.id === variation.id ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedVariation(variation)}
                  >
                    {variation.name} - {variation.price} €
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-lg font-semibold mb-4">{product.price} €</p>
          )}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Quantity</h2>
            <div className="flex items-center">
              <button
                className="border rounded px-4 py-2"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span className="mx-4">{quantity}</span>
              <button
                className="border rounded px-4 py-2"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddToCart}
            disabled={product.productType === 'variable' && !selectedVariation}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
