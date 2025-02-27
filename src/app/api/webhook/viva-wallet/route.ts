import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { OrderService, OrderStatus } from '@/services/orders';

/**
 * Gère les webhooks de Viva Wallet
 * Documentation: https://developer.vivawallet.com/webhooks/
 */
export async function POST(request: NextRequest) {
  try {
    // Récupérer les en-têtes et le corps de la requête
    const payload = await request.json();
    const signature = request.headers.get('X-Signature');
    console.log('Webhook reçu depuis Viva Wallet:', payload);
    console.log('Signature:', signature);

    // Vérifier la signature du webhook (en production)
    if (process.env.NODE_ENV === 'production' && process.env.VIVA_WALLET_WEBHOOK_SECRET) {
      if (!signature) {
        console.error('Signature manquante dans l\'en-tête de la requête');
        return NextResponse.json({ error: 'Signature manquante' }, { status: 401 });
      }

      const webhookSecret = process.env.VIVA_WALLET_WEBHOOK_SECRET;
      const hmac = crypto.createHmac('sha256', webhookSecret);
      const rawBody = JSON.stringify(payload);
      const calculatedSignature = hmac.update(rawBody).digest('hex');

      if (calculatedSignature !== signature) {
        console.error('Signature invalide');
        return NextResponse.json({ error: 'Signature invalide' }, { status: 401 });
      }
    }

    // Traiter différents types d'événements
    if (payload.EventType === 'transaction.success') {
      console.log('Paiement réussi pour la transaction:', payload.TransactionId);
      
      // Trouver la commande correspondante et mettre à jour son statut
      // Dans une implémentation réelle, rechercher dans la base de données
      const paymentId = payload.OrderCode; // L'ID du paiement VivaWallet
      
      // Simuler la recherche d'une commande par ID de paiement
      // Dans une implémentation réelle, cela serait fait dans la base de données
      // Pour cet exemple, on parcourt toutes les commandes
      const allOrders = Object.values(await OrderService.getOrdersByCustomerEmail(payload.CustomerEmail || ''));
      const order = allOrders.find(o => o.paymentId === paymentId);
      
      if (order) {
        // Mettre à jour la commande avec le statut payé et l'ID de transaction
        await OrderService.updateOrderStatus(
          order.id,
          OrderStatus.PAID,
          { transactionId: payload.TransactionId }
        );
        
        // TODO: Envoyer un email de confirmation
        console.log(`Commande ${order.id} mise à jour vers le statut PAYÉ`);
      } else {
        console.error(`Aucune commande trouvée pour le paiement ID: ${paymentId}`);
      }
    } else if (payload.EventType === 'transaction.fail') {
      console.log('Échec du paiement pour la transaction:', payload.TransactionId);
      
      // Logique similaire pour trouver et mettre à jour la commande en échec
      const paymentId = payload.OrderCode;
      const allOrders = Object.values(await OrderService.getOrdersByCustomerEmail(payload.CustomerEmail || ''));
      const order = allOrders.find(o => o.paymentId === paymentId);
      
      if (order) {
        await OrderService.updateOrderStatus(
          order.id,
          OrderStatus.FAILED,
          { transactionId: payload.TransactionId }
        );
        
        // TODO: Notifier le client de l'échec
        console.log(`Commande ${order.id} mise à jour vers le statut ÉCHEC`);
      }
    }

    // Répondre avec succès pour indiquer que le webhook a été reçu
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors du traitement du webhook Viva Wallet:', error);

    // Toujours retourner un statut 200 pour éviter que Viva Wallet ne réessaie
    // Mais inclure un message d'erreur pour le débogage
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 200 }
    );
  }
}
