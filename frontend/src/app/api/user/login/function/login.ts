import { NextResponse } from 'next/server';

export async function login(req: Request) {
    const body = await req.json();

    const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
    }

    const res = NextResponse.json({ message: 'Login OK' });

    res.cookies.set('access_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
    });

    return res;
}