// import { getPayloadHMR } from '@payloadcms/next/utilities';
// import { NextResponse } from 'next/server';
// import configPromise from '../../../payload.config'; // Assure-toi que c'est bien la configuration Payload

// export async function GET() {
//   try {
//     const payload = await getPayloadHMR({ config: configPromise }); // ✅ Récupération dynamique

//     const users = await payload.find({
//       collection: 'users',
//       depth: 0,
//     });

//     // Filtrer les informations sensibles et formater pour une meilleure lisibilité
//     const cleanUsers = users.docs.map(user => ({
//       id: user.id,
//       email: user.email,
//       role: user.role,
//       _verified: user._verified,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt
//     }));

//     return NextResponse.json(cleanUsers, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
//   }
// }

