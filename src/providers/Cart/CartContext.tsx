'use client';

import type { Media, Product } from '@/payload-types'; // Import du type Product généré par Payload
import { createContext, ReactNode, useEffect, useState } from 'react';

// Définition du type Variation basé sur le champ `variations` de `Product`
export type Variation = NonNullable<Product['variations']>[number];

export type CartItem = {
  product: Product;
  variation?: Variation | null;
  quantity: number;
  images: Media[];
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
      // Créer une copie du panier actuel
      const newCart = [...prevCart];

      // Chercher si le produit existe déjà
      const existingItemIndex = newCart.findIndex((item) => {
        if (variation) {
          return item.product.id === product.id && item.variation?.id === variation.id;
        }
        return item.product.id === product.id && !item.variation;
      });

      // Conversion des images
      const images: Media[] = product.images.map((img) => {
        if (typeof img === 'string') {
          return {
            id: `temp-${Math.random()}`,
            url: img,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          } as Media;
        }
        return img as Media;
      });

      // Si le produit existe, mettre à jour la quantité
      if (existingItemIndex !== -1) {
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity,
        };
        return newCart;
      }

      // Sinon, ajouter le nouveau produit
      return [
        ...newCart,
        {
          product,
          variation,
          quantity,
          images,
        },
      ];
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

