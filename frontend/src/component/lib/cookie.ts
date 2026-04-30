import * as cookie from 'cookie';
import { NextResponse } from 'next/server';

export function getTokenFromCookie(req: any) {
  if (!req.headers.cookie) return null;

  const cookies = cookie.parse(req.headers.cookie);
  console.log("Cookies recebidos:", cookies);

  // corrigido: access_token
  return cookies['access_token'] || null;
}

export function cabecalho(req: any) {
  const token = getTokenFromCookie(req);

  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
}

export function saveCookie(token: string) {
  const serialized = cookie.serialize('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
  });

  return NextResponse.json(
    { message: 'ok' },
    {
      headers: {
        'Set-Cookie': serialized,
      },
    }
  );
}

export function deleteCookie() {
  const serialized = cookie.serialize('access_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 0,
    path: '/',
  });

  return NextResponse.json(
    { message: 'deleted' },
    {
      headers: {
        'Set-Cookie': serialized,
      },
    }
  );
}