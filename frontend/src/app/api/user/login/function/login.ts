import { NextResponse } from 'next/server'

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

    const res = NextResponse.json(data);

    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
        res.headers.set('set-cookie', setCookie);
    }

    return res;
}