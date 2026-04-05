import { NextRequest } from 'next/server'

export async function criarUsuario(req: Request){
    const body = await req.json();

    const response = await fetch('http://localhost:4000/user/register/criar',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    // ✅ checar se deu certo antes de parsear
    if (!response.ok) {
        const text = await response.text(); // pega erro real
        console.error('Erro no backend:', text);
        throw new Error('Falha ao criar usuário');
    }

    const data = await response.json();
    return data;
}