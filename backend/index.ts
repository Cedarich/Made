import { VercelRequest, VercelResponse } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../backend/src/app.module';
import { BlogPostController } from '../backend/src/blog-post/blog-post.controller';
import * as bcrypt from 'bcryptjs';
import { Handler } from 'express';

const handler: Handler = async (req, res) => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const blogPostController = app.get(BlogPostController);

  if (req.method === 'GET' && req.url === '/api/blog-posts') {
    console.log('Fetching blog posts...');
    const posts = await blogPostController.findAll();
    res.status(200).json(posts);
  } else {
    res.status(404).json({ message: 'Not Found' });
  }
};

export default handler;