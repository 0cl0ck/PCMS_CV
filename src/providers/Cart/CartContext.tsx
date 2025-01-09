'use client';

import type { Product } from '@/payload-types'; // Import du type Product généré par Payload
import { createContext, ReactNode, useEffect, useState } from 'react';

// Définition du type Variation basé sur le champ `variations` de `Product`
export type Variation = NonNullable<Product['variations']>[number];

export type CartItem = {
  product: Product;
  variation?: Variation | null;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, variation: Variation | null, quantity: number) => void;
  removeFromCart: (productId: string, variationId: string | null | undefined) => void;
  updateQuantity: (
    productId: string,
    variationId: string | null | undefined,
    quantity: number,
  ) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, variation: Variation | null, quantity: number) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.variation?.id === variation?.id,
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      }

      return [...prevCart, { product, variation, quantity }];
    });
  };

  const removeFromCart = (productId: string, variationId: string | null | undefined) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.product.id !== productId || item.variation?.id !== variationId,
      ),
    );
  };

  const updateQuantity = (
    productId: string,
    variationId: string | null | undefined,
    quantity: number,
  ) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product.id === productId && item.variation?.id === variationId,
      );

      if (productIndex !== -1) {
        updatedCart[productIndex].quantity = quantity;
      }

      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
