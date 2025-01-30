/* eslint-disable prettier/prettier */
import { Schema, Document, Types } from 'mongoose';

export const BlogPostSchema = new Schema({
  postId: { type: Number, required: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: false },
  imageUrl: { type: String, required: true },
  date: { type: String, required: true },
  readTime: { type: String, required: true },
});

export interface BlogPostBase {

  postId: number;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl: string;
  date: string;
  readTime: string;
}

export interface BlogPost extends BlogPostBase, Document {}