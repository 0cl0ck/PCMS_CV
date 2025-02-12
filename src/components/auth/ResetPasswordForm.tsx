'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSafeSearchParams } from '@/hooks/useSearchParamsProvider';

export const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const searchParams = useSafeSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const endpoint = token ? '/api/auth/reset-password' : '/api/auth/forgot-password';

      const body = token ? { token, password } : { email };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      setSuccessMessage(
        token
          ? 'Mot de passe réinitialisé avec succès ! Vous allez être redirigé...'
          : 'Un email de réinitialisation a été envoyé à votre adresse email.',
      );

      if (token) {
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {!token ? (
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      ) : (
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      )}

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}

      <div className="flex items-center justify-between">
        <Link href="/login" className="text-sm text-green-600 hover:text-green-500">
          Retour à la connexion
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {loading
          ? 'Envoi en cours...'
          : token
            ? 'Réinitialiser le mot de passe'
            : 'Envoyer le lien de réinitialisation'}
      </button>
    </form>
  );
};
