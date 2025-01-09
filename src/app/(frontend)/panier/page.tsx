'use client';

import { Media } from '@/components/Media';
import { Button } from '@/components/ui/button';
import { CartContext, CartItem } from '@/providers/Cart/CartContext';
import React, { useContext } from 'react';

const PanierPage: React.FC = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) return null;

  const { cart, updateQuantity, removeFromCart } = cartContext;

  const total = cart.reduce(
    (acc, item) =>
      acc + item.quantity * ((item.variation?.price ?? 0) || (item.product?.price ?? 0)),
    0,
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Panier</h1>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <CartItemComponent
              key={`${item.product.id}-${item.variation?.id}`}
              item={item}
              onQuantityChange={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
          <div className="mt-8">
            <h2 className="text-xl font-bold">Total: {total} €</h2>
            <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Passer à la caisse
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

type CartItemProps = {
  item: CartItem;
  onQuantityChange: (productId: string, variationId: string | undefined, quantity: number) => void;
  onRemove: (productId: string, variationId: string | undefined) => void;
};

const CartItemComponent: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-1/4">
        {item.images && item.images.length > 0 ? (
          <Media resource={item.images[0]} size="33vw" />
        ) : (
          <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-500">
            No image
          </div>
        )}
      </div>
      <div className="w-3/4 pl-4">
        <h2 className="text-lg font-semibold">{item.product.name}</h2>
        {item.variation && <p>Variation: {item.variation.name}</p>}
        <p>Prix unitaire: {item.variation?.price || item.product.price} €</p>
        <div className="flex items-center mt-2">
          <button
            className="border rounded px-4 py-2"
            onClick={() =>
              onQuantityChange(item.product.id, item.variation?.id || undefined, item.quantity - 1)
            }
          >
            -
          </button>
          <span className="mx-4">{item.quantity}</span>
          <button
            className="border rounded px-4 py-2"
            onClick={() =>
              onQuantityChange(item.product.id, item.variation?.id || undefined, item.quantity + 1)
            }
          >
            +
          </button>
        </div>
        <button
          className="mt-2 text-red-500"
          onClick={() => onRemove(item.product.id, item.variation?.id || undefined)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default PanierPage;
