import { getPayload } from '@/lib/payload';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const payload = await getPayload();
    const headersList = await headers();

    // 🔴 Correction : `logout()` n'existe pas dans Payload 3.15.1
    // ✅ Solution : Supprimer simplement le cookie d'authentification

    // Créer une réponse et supprimer le cookie d'authentification
    const response = NextResponse.json({ success: true });

    // 🔴 Correction de `response.cookies.delete()`
    // ❌ Mauvais : response.cookies.delete('payload-token', { path: '/' })
    // ✅ Correct :
    response.cookies.delete('payload-token'); // On ne met qu'un seul argument

    return response;
  } catch (error) {
    console.error('Error in logout route:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de la déconnexion' },
      { status: 500 },
    );
  }
}

