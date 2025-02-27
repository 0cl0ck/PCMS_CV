import { NextRequest, NextResponse } from 'next/server';
import { VivaWalletService } from '@/services/vivawallet';

export async function GET(request: NextRequest) {
  try {
    // Récupérer l'ID de transaction depuis les paramètres d'URL
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');

    if (!transactionId) {
      return NextResponse.json(
        { error: 'L\'identifiant de transaction est requis' },
        { status: 400 }
      );
    }

    console.log('Vérification de la transaction:', transactionId);
    const transactionData = await VivaWalletService.verifyTransaction(transactionId);

    return NextResponse.json(transactionData);
  } catch (error) {
    console.error('Échec de la vérification de la transaction:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
}
