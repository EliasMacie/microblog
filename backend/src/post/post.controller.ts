import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/auth.guard'

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
        return this.postService.createPost(createPostDto);
    }

    @Get()
    async findAll() {
        return this.postService.findAll()
    }
}