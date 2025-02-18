import { getPayload } from '@/lib/payload';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const payload = await getPayload();
    if (!payload) {
      console.error('Payload initialization failed');
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const headersList = await headers();

    try {
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

      return NextResponse.json(users.docs[0]);
    } catch (error) {
      console.error('Error querying users:', error);
      return NextResponse.json({ error: 'Error querying users' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in me route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
