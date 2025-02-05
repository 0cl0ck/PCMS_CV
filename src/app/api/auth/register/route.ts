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

    // Connecter l'utilisateur
    try {
      const { token, user: loggedInUser } = await payload.login({
        collection: 'users',
        data: {
          email,
          password,
        },
      });

      // Créer la réponse avec le cookie d'authentification
      const response = NextResponse.json({ user: loggedInUser });
      if (token) {
        response.cookies.set('payload-token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        });
      }

      return response;
    } catch (loginError) {
      console.error('Error logging in after registration:', loginError);
      // Si la connexion échoue, on renvoie quand même l'utilisateur créé
      return NextResponse.json({
        user: newUser,
        message:
          'Compte créé avec succès, mais erreur lors de la connexion automatique. Veuillez vous connecter manuellement.',
      });
    }
  } catch (error) {
    console.error('Error in register route:', error);
    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'inscription" },
      { status: 500 },
    );
  }
}

