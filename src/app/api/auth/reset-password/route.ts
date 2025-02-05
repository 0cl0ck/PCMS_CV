import { getPayload } from '@/lib/payload';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: 'Token et mot de passe requis' }, { status: 400 });
    }

    const payload = await getPayload();

    await payload.resetPassword({
      collection: 'users',
      data: {
        token,
        password,
      },
      overrideAccess: false,
    });

    return NextResponse.json({
      message: 'Mot de passe réinitialisé avec succès',
    });
  } catch (error) {
    console.error('Error in reset password:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la réinitialisation du mot de passe' },
      { status: 400 },
    );
  }
}

