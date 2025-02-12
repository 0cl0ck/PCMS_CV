'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode, Suspense, createContext, useContext, useEffect, useState } from 'react';

const SearchParamsContext = createContext<URLSearchParams | null>(null);

const SearchParamsProviderComponent = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    setParams(searchParams);
  }, [searchParams]);

  return <SearchParamsContext.Provider value={params}>{children}</SearchParamsContext.Provider>;
};

export const SearchParamsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <SearchParamsProviderComponent>{children}</SearchParamsProviderComponent>
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
