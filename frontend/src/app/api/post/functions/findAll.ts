import { NextRequest } from 'next/server'
import { GetUserId } from '../../getUserId';
import { cabecalho } from '@/component/lib/cookie';
import { cookies } from 'next/headers';

export async function findAll(req: Request) {
    // const cookieStore = await cookies()
    // console.log(cookieStore.get('access_token'))
    let data;

    try {
        const response = await fetch('http://localhost:4000/post/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${cookieStore.get('access_token')?.value}`
            },
        })

        if (!response.ok){
            console.error("Erro ao listar post no frontend:", response.statusText);
        }

         data = await response.json();
         return {sucesso: data.sucesso, posts: data.posts};
    }catch (error) {
        console.error("Erro na requisição ao buscar os posts no frontend:", error);
        return {sucesso: false, message: 'Erro ao listar os posts no frontend'};
    }
}