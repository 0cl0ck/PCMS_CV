'use client';

import React from 'react';
import { CartProvider } from './Cart/CartContext';
import { HeaderThemeProvider } from './HeaderTheme';
import { ThemeProvider } from './Theme';
import { AuthProvider } from '@/components/auth/AuthProvider';

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  );
};
