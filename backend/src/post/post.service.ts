import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { catchError } from 'rxjs';

@Injectable()
export class PostService {
    constructor(
        private readonly dataSource: DataSource,
    ){}

    async createPost(createPostDto: CreatePostDto) {
        const sql = `CALL post(?, NULL, ?, ?, NULL, @sucesso, @id)`;

        const params = [
            'criar',
            createPostDto.perfilId,
            createPostDto.conteudo,
        ];

        await this.dataSource.query(sql, params);

        const result = await this.dataSource.query(
            'SELECT @sucesso as sucesso, @id as id'
        );

        const { sucesso, id } = result[0];

        if (!sucesso) {
            return { sucesso: false, message: 'Erro ao criar post' };
        }

        return { sucesso, id };
    }

    async findAll() {
        const sql = `CALL post(?, NULL, NULL, NULL, NULL, @sucesso, @id)`;
        const params = [
            'listar_feed_recomendados',
        ]
        try {
            const result = await this.dataSource.query(sql, params);
            const posts = result[0];

            return {sucesso: true, posts};
        }catch(error){
            console.error("erro ao listar os posts", error)
            return {sucesso: false, message: 'Erro ao listar os posts'};
        }
    }
}