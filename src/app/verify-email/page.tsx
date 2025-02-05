'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        {status === 'loading' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Vérification de votre email...</h2>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">✓ Vérification réussie</h2>
            <p className="text-gray-600">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">✗ Erreur</h2>
            <p className="text-gray-600">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
