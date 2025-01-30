import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const response = await axios.get(
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=6&tsym=USD'
      );
      return res.status(200).json(response.data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}