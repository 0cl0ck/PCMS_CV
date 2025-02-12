'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SearchParamsProvider, useSafeSearchParams } from '@/hooks/useSearchParamsProvider';

function VerifyEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSafeSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          setStatus('error');
          setMessage('Token manquant');
          return;
        }

        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Une erreur est survenue');
        }

        setStatus('success');
        setMessage('Email vérifié avec succès ! Vous allez être redirigé...');

        // Rediriger vers la page de connexion après 3 secondes
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Une erreur est survenue');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Vérification de l&apos;email
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {status === 'loading' && <p>Vérification en cours...</p>}
            {status === 'success' && <p className="text-green-600">{message}</p>}
            {status === 'error' && <p className="text-red-600">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <SearchParamsProvider>
      <VerifyEmailContent />
    </SearchParamsProvider>
  );
}
