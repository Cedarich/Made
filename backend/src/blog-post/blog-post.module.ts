import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPost, BlogPostSchema } from '../schemas/blog-post.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'BlogPost', schema: BlogPostSchema }]),
  ],
  controllers: [BlogPostController],
  providers: [BlogPostService],
})
export class BlogPostModule {}