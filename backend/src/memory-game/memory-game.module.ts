import { Module } from '@nestjs/common';
import { MemoryGameService } from './memory-game.service';
import { MemoryGameController } from './memory-game.controller';

@Module({
  providers: [MemoryGameService],
  controllers: [MemoryGameController]
})
export class MemoryGameModule {}
