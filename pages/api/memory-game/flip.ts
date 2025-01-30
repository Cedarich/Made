import { NextApiRequest, NextApiResponse } from 'next';
import { MemoryGameService } from '../../../backend/src/memory-game/memory-game.service';

const memoryGameService = new MemoryGameService();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { gameId, cardIds } = req.body;
    const result = memoryGameService.flipCards(gameId, cardIds);
    res.status(200).json(result);
  } else {
    res.status(405).end();
  }
}; 