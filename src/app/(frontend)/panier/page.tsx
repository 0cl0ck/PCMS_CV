'use client';

import { Media } from '@/components/Media';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CartContext, CartItem } from '@/providers/Cart/CartContext';
import CartPageClient from './page.client';
import React, { useContext, useState } from 'react';

const PanierPage: React.FC = () => {
  const cartContext = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
    phone?: string;
  }>({});

  if (!cartContext) return null;

  const { cart, updateQuantity, removeFromCart } = cartContext;

  const total = cart.reduce(
    (acc, item) =>
      acc + item.quantity * ((item.variation?.price ?? 0) || (item.product?.price ?? 0)),
    0,
  );

  const validateForm = () => {
    const newErrors: {
      email?: string;
      name?: string;
      phone?: string;
    } = {};
    let isValid = true;

    if (!customerInfo.email) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = 'Email invalide';
      isValid = false;
    }

    if (!customerInfo.name) {
      newErrors.name = 'Le nom est requis';
      isValid = false;
    }

    if (!customerInfo.phone) {
      newErrors.phone = 'Le numéro de téléphone est requis';
      isValid = false;
    } else if (!/^\+?\d{10,15}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment initialization failed');
      }

      const { smartCheckoutUrl } = await response.json();
      window.location.href = smartCheckoutUrl;
    } catch (error) {
      console.error('Checkout failed:', error);
      alert("Une erreur est survenue lors de l'initialisation du paiement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <CartPageClient />
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
            
            {!showCheckoutForm ? (
              <Button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleProceedToCheckout}
              >
                Procéder au paiement
              </Button>
            ) : (
              <form onSubmit={handleCheckout} className="mt-6 space-y-4 max-w-md">
                <h3 className="text-lg font-semibold">Informations de contact</h3>
                
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="Jean Dupont"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    placeholder="jean.dupont@example.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="+33 6 12 34 56 78"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCheckoutForm(false)}
                  >
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Chargement...' : 'Payer'}
                  </Button>
                </div>
              </form>
            )}
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
          <Media resource={item.images[0]} sizes="33vw" />
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
