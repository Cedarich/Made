import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BlogPostService } from './blog-post/blog-post.service';

const seedData = [
  {
    postId: 1,
    title: "The Future of DeFi: Predictions for 2024",
    excerpt: "Exploring the upcoming trends in decentralized finance...",
    content: process.env.POST_1_CONTENT,
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    date: "2024-03-20",
    readTime: "5 min read"
  },
 
  {
    postId: 2,
    title: "NFTs Beyond Digital Art",
    excerpt: "Discover how NFTs are revolutionizing industries...",
    content: process.env.POST_2_CONTENT,
    imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d",
    date: "2024-03-19",
    readTime: "4 min read"
  },
  {
    postId: 3,
    title: "Blockchain in Supply Chain Management",
    excerpt: "How blockchain is transforming global supply chains...",
    content: process.env.POST_3_CONTENT,
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    date: "2024-03-18",
    readTime: "6 min read"
  },
  {
    postId: 4,
    title: "The Evolution of Smart Contracts",
    excerpt: "Understanding the next generation of smart contract technology...",
    content: process.env.POST_4_CONTENT,
    imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05",
    date: "2024-03-17",
    readTime: "5 min read"

  },
  {
    postId: 5,
    title: "Web3 and the Future of the Internet",
    excerpt: "Exploring how Web3 is reshaping online interactions...",
    content: process.env.POST_5_CONTENT,
    imageUrl: "https://images.unsplash.com/photo-1638913974023-cef988e81629",
    date: "2024-03-16",
    readTime: "7 min read"
  },
  {
    postId: 6,
    title: "Crypto Regulation: What's Next?",
    excerpt: "A deep dive into the evolving landscape of crypto regulations...",
    content: process.env.POST_6_CONTENT,
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    date: "2024-03-15",
    readTime: "6 min read"
  },
  {
    postId: 7,
    title: "The Rise of DAOs in Web3",
    excerpt: "How decentralized autonomous organizations are changing governance...",
    content: process.env.POST_7_CONTENT,
    imageUrl: "https://images.unsplash.com/photo-1643827991086-1b3b3b3b3b3b",
    date: "2024-03-14",
    readTime: "5 min read"
  },
  {
    postId: 8,
    title: "Understanding Layer 2 Solutions",
    excerpt: "A comprehensive guide to Ethereum's Layer 2 scaling solutions...",
    content: process.env.POST_8_CONTENT,
    imageUrl: "https://images.unsplash.com/photo-1638913971783-015a4a2425c4",
    date: "2024-03-13",
    readTime: "8 min read"
  },
  {
    postId: 9,
    title: "The Impact of AI on Blockchain",
    excerpt: "Exploring the intersection of artificial intelligence and blockchain...",
    content: process.env.POST_9_CONTENT,
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    date: "2024-03-12",
    readTime: "6 min read"
  },
  {
    postId: 10,
    title: "Sustainable Blockchain Solutions",
    excerpt: "How the blockchain industry is addressing environmental concerns...",
    content: process.env.POST_10_CONTENT,
    imageUrl: "https://images.unsplash.com/photo-1638913971783-015a4a2425c4",
    date: "2024-03-11",
    readTime: "7 min read"
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const blogPostService = app.get(BlogPostService);

  await blogPostService.seed(seedData);
  console.log('Database seeded successfully!');
  await app.close();
}

bootstrap();