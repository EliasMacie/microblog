import { NextRequest } from 'next/server'

export async function enviarCodigoEmail(req: Request){
    const body = await req.json();
    const {email} = body;

    const response = await fetch('https://localhost:4000',{
        method: 'POST',
        body: JSON.stringify(email)
    })

    const data = await response.json()

    // return response.json(data, {ok: response.ok})
}