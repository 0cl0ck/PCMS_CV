'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { PasswordInput } from './PasswordInput';
import { useSafeSearchParams } from '@/hooks/useSearchParamsProvider';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSafeSearchParams();
  const { setUser } = useAuth();

  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      setUser(data.user);
      router.push(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Mot de passe
        </label>
        <PasswordInput value={password} onChange={setPassword} />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex items-center justify-between">
        <Link
          href="/reset-password"
          className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
        >
          Mot de passe oublié ?
        </Link>
        <Link
          href="/register"
          className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
        >
          Créer un compte
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
};
