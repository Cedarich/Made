import { Controller, Post, Body, Get } from '@nestjs/common';
import { MemoryGameService } from './memory-game.service';

@Controller('memory-game')
export class MemoryGameController {
  constructor(private readonly memoryGameService: MemoryGameService) {}

  @Post('start')
  startGame() {
    return this.memoryGameService.startGame();
  }

  @Post('flip')
  flipCards(@Body() body: { gameId: string, cardIds: number[] }) {
    return this.memoryGameService.flipCards(body.gameId, body.cardIds);
  }

  @Post('withdraw')
  withdraw(@Body() body: { userId: string }) {
    return this.memoryGameService.withdraw(body.userId);
  }

  @Post('reshuffle')
  reshuffleCards(@Body() body: { gameId: string }) {
    return this.memoryGameService.reshuffleCards(body.gameId);
  }
}
