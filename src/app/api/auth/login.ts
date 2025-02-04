import { getPayload } from '@/lib/payload';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email et mot de passe requis' }, { status: 400 });
    }

    const payload = await getPayload();

    const { user } = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json({ message: 'Email ou mot de passe incorrect' }, { status: 401 });
  }
}
