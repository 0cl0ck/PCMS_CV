import { getPayload } from '@/lib/payload';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: 'Token requis' }, { status: 400 });
    }

    const payload = await getPayload();

    // Vérifier l'email
    const isVerified = await payload.verifyEmail({
      collection: 'users',
      token,
    });

    if (!isVerified) {
      return NextResponse.json(
        { message: "Échec de la vérification de l'email. Le token est invalide ou expiré." },
        { status: 400 },
      );
    }

    return NextResponse.json({ message: 'Email vérifié avec succès' });
  } catch (error) {
    console.error('Error in verify-email route:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Une erreur est survenue' },
      { status: 500 },
    );
  }
}

