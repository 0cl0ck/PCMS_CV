'use client';

import React from 'react';
import { CartProvider } from './Cart/CartContext';
import { HeaderThemeProvider } from './HeaderTheme';
import { ThemeProvider } from './Theme';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { SearchParamsProvider } from '@/hooks/useSearchParamsProvider';

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <AuthProvider>
          <CartProvider>
            <SearchParamsProvider>
              {children}
            </SearchParamsProvider>
          </CartProvider>
        </AuthProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  );
};
