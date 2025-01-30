import { NextApiRequest, NextApiResponse } from 'next';
import { MemoryGameService } from '../../../backend/src/memory-game/memory-game.service';

const memoryGameService = new MemoryGameService();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      console.log("Starting new game...");
      const game = memoryGameService.startGame();
      console.log("Game started successfully:", game);
      res.status(200).json(game);
    } catch (error) {
      console.error("Error starting game:", error);
      res.status(500).json({ 
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
