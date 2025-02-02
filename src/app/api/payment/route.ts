import { NextRequest, NextResponse } from 'next/server';
import { VivaWalletService } from '@/services/vivawallet';

export async function POST(request: NextRequest) {
  try {
    console.log('Payment API called');
    const { amount, customerEmail, customerName, customerPhone } = await request.json();
    console.log('Request data:', { amount, customerEmail, customerName, customerPhone });

    const paymentResponse = await VivaWalletService.createPayment(
      amount,
      customerEmail,
      customerName,
      customerPhone
    );

    console.log('Payment response:', paymentResponse);
    return NextResponse.json(paymentResponse);
  } catch (error) {
    console.error('Payment creation failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
