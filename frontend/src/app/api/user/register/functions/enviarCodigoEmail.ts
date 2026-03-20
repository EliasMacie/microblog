import { NextRequest } from 'next/server'

export async function enviarCodigoEmail(req: Request){
    const body = await req.json();
    const {email} = body;

    const response = await fetch('http://localhost:4000/user/register/email',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
    })

    const data = await response.json()

    return data;
}