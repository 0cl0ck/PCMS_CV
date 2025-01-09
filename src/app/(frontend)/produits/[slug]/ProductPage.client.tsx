'use client';

import { Media } from '@/components/Media';
import { Button } from '@/components/ui/button';
import { Product } from '@/payload-types';
import { CartContext } from '@/providers/Cart/CartContext';
import { useTheme } from '@payloadcms/ui';
import React from 'react';
type Props = {
  product: Product;
};

export const ProductPage: React.FC<Props> = ({ product }) => {
  const cartContext = React.useContext(CartContext);
  const { theme } = useTheme();
  if (!cartContext) {
    console.error('CartContext is not provided. Ensure CartProvider wraps this component.');
    return null;
  }

  const { addToCart } = cartContext;

  const handleAddToCart = () => {
    addToCart(product, null, 1);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="flex">
        <div className="relative w-1/3">
          {product.images && product.images.length > 0 ? (
            <Media resource={product.images[0]} size="33vw" />
          ) : (
            <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-500">
              No image
            </div>
          )}
        </div>

        <div className="w-1/2 pl-4">
          {product.meta?.description && (
            <p>
              {typeof product.meta.description === 'string'
                ? product.meta.description
                : 'No description'}
            </p>
          )}
          {product.variations && product.variations.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Variations disponibles :</h3>
              <select
                className={`w-full p-2  border rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                onChange={(e) => {
                  const selectedVariation = product.variations?.find(
                    (variation) => variation.name === e.target.value,
                  );
                  console.log('Selected Variation:', selectedVariation);
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Choisissez une variation
                </option>
                {product.variations.map((variation, index) => (
                  <option key={index} value={variation.name}>
                    {variation.name} - {variation.price} €
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="text-lg font-bold mb-4">{product.price} €</p>
          )}

          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded my-4"
            onClick={handleAddToCart}
          >
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
};
