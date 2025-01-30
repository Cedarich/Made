import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BlogPostModule } from './blog-post/blog-post.module';
import { CryptoController } from './crypto/crypto.controller';
import { StatsModule } from './stats/stats.module';
import { MemoryGameModule } from './memory-game/memory-game.module';
import { StatsController } from './stats/stats.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    BlogPostModule,
    StatsModule,
    MemoryGameModule
  ],
  controllers: [CryptoController, StatsController],
})
export class AppModule {}