import { getPayload } from '@/lib/payload';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email requis' },
        { status: 400 }
      );
    }

    console.log('⌛ Vérification de l\'existence de l\'utilisateur:', email);
    
    const payload = await getPayload();

    // Vérifie si l'utilisateur existe
    const user = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!user?.docs?.length) {
      console.log('❌ Utilisateur non trouvé:', email);
      return NextResponse.json({
        message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.',
      });
    }

    console.log('⌛ Envoi de l\'email de réinitialisation à:', email);
    
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
    console.error('❌ Erreur lors de l\'envoi de l\'email de réinitialisation:', error);
    return NextResponse.json({
      message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.',
    });
  }
}
