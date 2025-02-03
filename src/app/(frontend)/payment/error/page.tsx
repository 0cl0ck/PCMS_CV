'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function PaymentErrorPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-16 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-red-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Erreur de paiement</h1>
        <p className="text-gray-600 mb-8">
          Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer ou
          contacter notre service client si le problème persiste.
        </p>
        <div className="space-y-4">
          <Button
            onClick={() => router.push('/panier')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full"
          >
            Retour au panier
          </Button>
          <Button
            onClick={() => router.push('/')}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg w-full"
          >
            Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    </div>
  );
}

