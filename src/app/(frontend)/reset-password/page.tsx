'use client';

import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { SearchParamsProvider } from '@/hooks/useSearchParamsProvider';

export default function ResetPasswordPage() {
  return (
    <SearchParamsProvider>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Réinitialisation du mot de passe
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </SearchParamsProvider>
  );
}
