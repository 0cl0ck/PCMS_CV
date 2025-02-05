import { getPayload } from '@/lib/payload';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Tous les champs sont requis' }, { status: 400 });
    }

    const payload = await getPayload();

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (existingUser.totalDocs > 0) {
      return NextResponse.json({ message: 'Cet email est déjà utilisé' }, { status: 400 });
    }

    // Créer le nouvel utilisateur
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        role: 'customer',
      },
    });

    if (!newUser) {
      return NextResponse.json(
        { message: 'Erreur lors de la création du compte' },
        { status: 500 },
      );
    }

    // ✅ Ne pas essayer de se connecter, demander à l'utilisateur de vérifier son email
    return NextResponse.json({
      message: 'Compte créé avec succès ! Veuillez vérifier votre email pour activer votre compte.',
      user: {
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error('Error in register route:', error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Une erreur est survenue',
      },
      { status: 500 },
    );
  }
}
