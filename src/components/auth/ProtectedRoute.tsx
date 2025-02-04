'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { isAdmin } from '@/lib/auth';

type Props = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

export const ProtectedRoute: React.FC<Props> = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/login?redirect=${pathname}`);
      } else if (requireAdmin && !isAdmin(user)) {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router, pathname, requireAdmin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (requireAdmin && !isAdmin(user))) {
    return null;
  }

  return <>{children}</>;
};