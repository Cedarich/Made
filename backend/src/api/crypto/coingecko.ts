import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'
      );
      console.log('CoinGecko API Response:', response.data);
      return res.status(200).json(response.data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
} 