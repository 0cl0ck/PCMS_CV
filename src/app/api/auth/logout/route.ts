'use server';

import configPromise from '@/payload.config';
import { cookies, headers } from 'next/headers';
import { getPayload } from 'payload';

const payloadToken = 'payload-token';

export async function POST() {
  try {
    const _payload = await getPayload({ config: configPromise });
    const _headersList = headers();

    // Supprimer le cookie d'authentification
    (await cookies()).delete(payloadToken);

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to logout',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}

