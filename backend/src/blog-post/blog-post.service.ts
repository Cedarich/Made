import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost, BlogPostBase } from '../schemas/blog-post.schema';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectModel('BlogPost') private readonly blogPostModel: Model<BlogPost>,
  ) {}

  async findAll(): Promise<BlogPost[]> {
    console.log('Fetching blog posts from DB...');
    return this.blogPostModel.find().exec();
  }

  async seed(blogPosts: BlogPostBase[]): Promise<BlogPost[]> {
    return this.blogPostModel.insertMany(blogPosts);
  }


}



