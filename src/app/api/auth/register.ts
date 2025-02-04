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
    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        role: 'customer',
      },
    });

    // Connecter l'utilisateur
    const { user: loggedInUser } = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    });

    return NextResponse.json({ user: loggedInUser });
  } catch (error) {
    console.error('Error in register route:', error);
    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'inscription" },
      { status: 500 },
    );
  }
}

