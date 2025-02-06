import { getPayloadHMR } from '@payloadcms/next/utilities';
import { NextResponse } from 'next/server';
import configPromise from '../../../payload.config';

export async function POST(req: Request) {
  try {
    const payload = await getPayloadHMR({ config: configPromise });
    const { email } = await req.json();

    // Créer une session admin temporaire
    await payload.login({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'admin123',
      },
    });

    // Trouver l'utilisateur à vérifier
    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (users.docs.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = users.docs[0];

    // Forcer la vérification via l'API admin
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        email: user.email,
      },
      user: {
        role: 'admin',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying user:', error);
    return NextResponse.json({ error: 'Failed to verify user' }, { status: 500 });
  }
}
