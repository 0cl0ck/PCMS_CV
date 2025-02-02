'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function PaymentCancelPage() {
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
        <h1 className="text-2xl font-bold mb-4">Paiement annulé</h1>
        <p className="text-gray-600 mb-8">
          Le paiement n&apos;a pas pu être traité ou a été annulé. 
          Vous pouvez réessayer ou choisir un autre moyen de paiement.
        </p>
        <Button
          onClick={() => router.push('/panier')}
          className="bg-primary hover:bg-primary/90"
        >
          Retourner au panier
        </Button>
      </div>
    </div>
  );
}
