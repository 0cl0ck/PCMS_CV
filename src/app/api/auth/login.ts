import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { getPayload } from '../../../lib/payload';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const headersList = await headers();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email et mot de passe requis' }, { status: 400 });
    }

    const payload = await getPayload();

    const { token, user } = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
      req: {
        headers: headersList,
      },
    });

    const response = NextResponse.json({ user });

    if (token) {
      response.cookies.set('payload-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json({ message: 'Email ou mot de passe incorrect' }, { status: 401 });
  }
}

