'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode, Suspense, createContext, useContext } from 'react';

const SearchParamsContext = createContext<URLSearchParams | null>(null);

const SearchParamsContent = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  return <SearchParamsContext.Provider value={searchParams}>{children}</SearchParamsContext.Provider>;
};

export const SearchParamsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SearchParamsContent>{children}</SearchParamsContent>
    </Suspense>
  );
};

export const useSafeSearchParams = () => {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error('useSafeSearchParams must be used within <SearchParamsProvider>');
  }
  return context;
};
