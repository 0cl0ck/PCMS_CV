'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/components/auth/AuthProvider';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Tableau de bord
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        Bienvenue, {user?.name} !
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Voici votre espace personnel
                      </p>
                    </div>

                    {/* Section des commandes récentes */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Vos commandes récentes
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Aucune commande récente
                        </p>
                      </div>
                    </div>

                    {/* Section des informations du compte */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Informations du compte
                      </h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-500">
                          Email : {user?.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          Type de compte : {user?.role === 'admin' ? 'Administrateur' : 'Client'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}