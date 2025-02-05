import { getPayload } from '@/lib/payload';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const payload = await getPayload();
    if (!payload) return NextResponse.json(null);

    const headersList = await headers();

    const users = await payload.find({
      collection: 'users',
      depth: 2,
      req: {
        headers: headersList,
      },
    });

    if (!users || !users.docs.length) {
      return NextResponse.json(null);
    }

    return NextResponse.json({ user: users.docs[0] });
  } catch (error) {
    console.error('Error in me route:', error);
    return NextResponse.json(null);
  }
}

