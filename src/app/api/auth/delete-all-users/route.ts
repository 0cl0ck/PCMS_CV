import { getPayload } from '@/lib/payload';
import { NextResponse } from 'next/server';

export async function DELETE() {
  // ⚠️ Cette route ne doit être utilisée qu'en développement
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { message: 'Cette route n\'est pas disponible en production' },
      { status: 403 }
    );
  }

  try {
    const payload = await getPayload();

    // Récupérer tous les utilisateurs sauf l'admin
    const { docs: users } = await payload.find({
      collection: 'users',
      where: {
        role: {
          not_equals: 'admin'
        }
      }
    });

    // Supprimer chaque utilisateur
    const deletionPromises = users.map(user => 
      payload.delete({
        collection: 'users',
        id: user.id
      })
    );

    await Promise.all(deletionPromises);

    return NextResponse.json({ 
      message: `${users.length} utilisateurs supprimés avec succès`,
      deletedCount: users.length 
    });
  } catch (error) {
    console.error('Error deleting users:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de la suppression des utilisateurs' },
      { status: 500 }
    );
  }
}
