import { NextRequest } from 'next/server'
import { GetUserId } from '../../getUserId';
import { cabecalho } from '@/component/lib/cookie';
import { cookies } from 'next/headers';

export async function post(req: Request) {
    const id = await GetUserId(req);
    const body = await req.json();
    const { content} = body;
    // const cab = await cabecalho(req);
    const cookieStore = await cookies()
    console.log(cookieStore.get('access_token'))
    let data;
    // console.log("cabecalho no post:", cab);

    try {
        const response = await fetch('http://localhost:4000/post/', {
            method: 'POST',
            headers: {
                // ...cab,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookieStore.get('access_token')?.value}`
            },
            body: JSON.stringify({ conteudo: content, perfilId: parseInt(id)})
        })

        if (!response.ok){
            console.error("Erro ao criar post:", response.statusText);
        }

         data = await response.json();
    }catch (error) {
        console.error("Erro na requisição:", error);
    }

    return data;
}