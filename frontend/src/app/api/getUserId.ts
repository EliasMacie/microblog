import { cookies } from 'next/dist/server/request/cookies';
import { cabecalho } from '../../component/lib/cookie';

export async function GetUserId(req: Request) {
    // const cab = await cabecalho(req);
    const cookieStore = await cookies()
    console.log(cookieStore.get('access_token'))

    const res = await fetch("http://localhost:4000/user/me", {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookieStore.get('access_token')?.value}`
        },
    });

    if (!res.ok) {
        const text = await res.text();
        console.error("Erro:", text);
        throw new Error("Erro na requisição");
    }

    const data = await res.json();


    console.log("User ID:", data.sub);
    return data.sub;
}