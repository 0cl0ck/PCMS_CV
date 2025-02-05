import { getPayload } from '@/lib/payload';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email requis' }, { status: 400 });
    }

    console.log("⌛ Vérification de l'existence de l'utilisateur:", email);

    // ✅ S'assurer que l'instance est initialisée
    const payload = await getPayload();

    if (!payload) {
      throw new Error("Impossible d'initialiser Payload");
    }

    // Vérifie si l'utilisateur existe
    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!users?.docs?.length) {
      console.log('❌ Utilisateur non trouvé:', email);
      return NextResponse.json({
        message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.',
      });
    }

    console.log("⌛ Envoi de l'email de réinitialisation à:", email);

    await payload.forgotPassword({
      collection: 'users',
      data: {
        email,
      },
    });

    console.log('✅ Email de réinitialisation envoyé avec succès à:', email);

    return NextResponse.json({
      message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.',
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email de réinitialisation:", error);
    return NextResponse.json(
      {
        message: 'Une erreur est survenue. Veuillez réessayer plus tard.',
      },
      { status: 500 }
    );
  }
}
