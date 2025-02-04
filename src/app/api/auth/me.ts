import { getPayload } from '@/lib/payload';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const payload = await getPayload();
    if (!payload) return NextResponse.json(null);

    const headersList = await headers();
    const user = await payload.find({
      collection: 'users',
      depth: 2,
      req: {
        headers: headersList,
      },
    });

    if (!user) {
      return NextResponse.json(null);
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in me route:', error);
    return NextResponse.json(null);
  }
}

