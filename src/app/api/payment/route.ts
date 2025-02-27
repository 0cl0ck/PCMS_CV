import { NextRequest, NextResponse } from 'next/server';
import { VivaWalletService } from '@/services/vivawallet';
import { OrderService, OrderStatus } from '@/services/orders';

export async function POST(request: NextRequest) {
  try {
    console.log('Payment API called');
    const { amount, customerEmail, customerName, customerPhone, items } = await request.json();
    console.log('Request data:', { amount, customerEmail, customerName, customerPhone, items });

    // Créer une nouvelle commande en statut "en attente"
    const order = await OrderService.createOrder({
      customerEmail,
      customerName,
      customerPhone,
      amount,
      items: items || [],
      paymentMethod: 'Viva Wallet',
    });

    // Créer le paiement Viva Wallet
    const paymentResponse = await VivaWalletService.createPayment(
      amount,
      customerEmail,
      customerName,
      customerPhone
    );

    // Mettre à jour l'ID de paiement dans la commande
    await OrderService.updateOrderStatus(
      order.id, 
      OrderStatus.PROCESSING, 
      { paymentId: paymentResponse.orderCode }
    );

    console.log('Payment response:', paymentResponse);
    return NextResponse.json({
      ...paymentResponse,
      orderId: order.id
    });
  } catch (error) {
    console.error('Payment creation failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
