'use client';
import { useEffect, useState } from 'react';
import Card from '../post/Card';
import styles from './Conteudo.module.css'

type posts = {
    post_id: number;
    conteudo: string;
    perfil_id: number;
    username: string;
    nome: string;
    created_at: string;
}

export default function Conteudo(){
    const [posts, setPosts] = useState<posts[]>([]);

    const buscarPosts = async () => {
        try {
            const response = await fetch('http://localhost:4000/post/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok){
                console.error("Erro ao listar post no frontend:", response.statusText);
            }
            const data = await response.json();
            setPosts(data.posts);
        }catch(error){
            console.error("Erro ao buscar posts:", error);
        }
    }

    useEffect(() => {
        buscarPosts();
    }, [])

    return(
        <div className={styles.conteiner}>
            {posts.map((post) => (
                <Card 
                    key={post.post_id}
                    post_id={post.post_id}
                    conteudo={post.conteudo}
                    perfil_id={post.perfil_id}
                    username={post.username}
                    nome={post.nome}
                    created_at={new Date(post.created_at).toLocaleDateString("en-US", {month: "short", day: "numeric",})}
                />
            ))
            }
        </div>
    );
}