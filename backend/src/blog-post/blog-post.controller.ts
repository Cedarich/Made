import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { BlogPost } from '../schemas/blog-post.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlogPostBase } from '../schemas/blog-post.schema';



@Controller('api/blog-posts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Get()
  async findAll(): Promise<BlogPost[]> {
    return this.blogPostService.findAll();
  }
}

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // async create(@Body() postData: CreateBlogPostDto) {
  //   console.log('Incoming post data:', postData);
  //   return this.blogPostService.create(postData);
  // }
