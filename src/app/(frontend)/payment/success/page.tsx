'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Order } from '@/services/orders';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Récupérer les paramètres de l'URL qui contiennent les données de transaction Viva Wallet
    const transactionId = searchParams.get('t');
    const orderId = searchParams.get('orderId');
    
    if (transactionId) {
      verifyTransaction(transactionId);
    } else {
      setVerificationStatus('Aucun identifiant de transaction trouvé dans l\'URL');
    }

    // Si un orderId est présent, récupérer les détails de la commande
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [searchParams]);

  const fetchOrderDetails = async (orderId: string) => {
    try {
      // Cette fonction serait implémentée pour récupérer les détails de la commande depuis le serveur
      // Pour cet exemple, nous ne l'implémentons pas complètement
      console.log('Récupération des détails de la commande:', orderId);
      
      // Simuler une récupération de commande
      // Dans une implémentation réelle, cela serait fait via un appel API
      setOrder({
        id: orderId,
        // Autres détails de la commande (à implémenter avec un vrai endpoint API)
        customerEmail: 'client@example.com',
        customerName: 'Client',
        customerPhone: '+33600000000',
        amount: 0,
        items: [],
        status: 'paid' as any,
        paymentMethod: 'Viva Wallet',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de la commande:', error);
    }
  };

  const verifyTransaction = async (transactionId: string) => {
    try {
      setIsVerifying(true);
      setVerificationStatus('Vérification du paiement en cours...');
      
      const response = await fetch(`/api/payment/verify?transactionId=${transactionId}`);
      
      if (!response.ok) {
        throw new Error('Impossible de vérifier la transaction');
      }
      
      const data = await response.json();
      
      // Vérifier le statut de la transaction
      if (data.statusId === 'F') { // 'F' pour terminé (à adapter selon l'API Viva Wallet)
        setVerificationStatus('Paiement validé !');
        // La mise à jour de la commande se fait désormais via webhook
      } else {
        setVerificationStatus(`Statut du paiement: ${data.statusId}`);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      setVerificationStatus('Une erreur est survenue lors de la vérification du paiement');
    } finally {
      setIsVerifying(false);
    }
  };

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
        
        {isVerifying && (
          <div className="my-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
          </div>
        )}
        
        {verificationStatus && (
          <p className="text-gray-600 mb-4">{verificationStatus}</p>
        )}

        {order && (
          <div className="mt-4 mb-6 text-left border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-lg mb-2">Détails de la commande</h3>
            <p><span className="font-medium">Commande :</span> #{order.id}</p>
            <p><span className="font-medium">Date :</span> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><span className="font-medium">Montant :</span> {order.amount} €</p>
            <p><span className="font-medium">Statut :</span> 
              <span className="ml-1 px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                {order.status === 'paid' ? 'Payée' : order.status}
              </span>
            </p>
          </div>
        )}
        
        <p className="text-gray-600 mb-8">
          Merci pour votre commande. Vous recevrez bientôt un email de confirmation.
        </p>
        <div className="flex flex-col space-y-3">
          <Button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full"
          >
            Retour à l&apos;accueil
          </Button>
          <Button
            onClick={() => router.push('/commandes')}
            variant="outline"
            className="px-6 py-2 rounded-lg w-full"
          >
            Voir mes commandes
          </Button>
        </div>
      </div>
    </div>
  );
}
