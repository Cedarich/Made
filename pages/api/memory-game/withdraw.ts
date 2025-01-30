import { NextApiRequest, NextApiResponse } from 'next';
import { MemoryGameService } from '../../../backend/src/memory-game/memory-game.service';

const memoryGameService = new MemoryGameService();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { gameId } = req.body;
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = memoryGameService.withdraw(gameId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Withdraw processing failed' });
    }
  } else {
    res.status(405).end();
  }
}; 