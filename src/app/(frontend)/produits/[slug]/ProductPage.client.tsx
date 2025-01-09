'use client';

import { ImageMedia } from '@/components/Media/ImageMedia';
import { Button } from '@/components/ui/button';
import type { Product } from '@/payload-types';
import { CartContext } from '@/providers/Cart/CartContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

type ProductPageProps = {
  product: Product;
};

const ProductPageClient: React.FC<ProductPageProps> = ({ product }) => {
  const [selectedVariation, setSelectedVariation] = useState<Product['variations'][0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const cartContext = useContext(CartContext);
  const router = useRouter();

  if (!cartContext) return null;

  const { addToCart } = cartContext;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          {product.images?.[0] && (
            <ImageMedia
              resource={product.images[0].url}
              className="w-full h-auto rounded-lg"
              size="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          {product.productType === 'simple' && <p className="text-2xl mb-4">{product.price}€</p>}

          {product.productType === 'variable' && product.variations && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Sélectionnez une variation:</label>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => {
                  const variation = product.variations?.find((v) => v.id === e.target.value);
                  setSelectedVariation(variation || null);
                }}
                value={selectedVariation?.id || ''}
              >
                <option value="">Choisir une option</option>
                {product.variations.map((variation) => (
                  <option key={variation.id || ''} value={variation.id || ''}>
                    {variation.name} - {variation.price}€
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Quantité:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-32 p-2 border rounded"
            />
          </div>

          <Button
            onClick={() => {
              if (product.productType === 'variable' && !selectedVariation) {
                alert('Veuillez sélectionner une variation');
                return;
              }
              addToCart(product, selectedVariation, quantity);
              router.push('/panier');
            }}
          >
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPageClient;
