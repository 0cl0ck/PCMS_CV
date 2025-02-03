'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-16 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-green-500 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Paiement réussi !</h1>
        <p className="text-gray-600 mb-8">
          Merci pour votre commande. Vous recevrez bientôt un email de confirmation.
        </p>
        <Button
          onClick={() => router.push('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Retour à l&apos;accueil
        </Button>
      </div>
    </div>
  );
}

