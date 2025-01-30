import { Controller, Get, Query } from '@nestjs/common';
import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function fetchWithRetry(url: string, options: any, retries = MAX_RETRIES) {
  try {
    const response = await axios({
      ...options,
      url,
      timeout: 10000, // Increase timeout to 10 seconds
    });
    return response.data;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

@Controller('crypto')
export class CryptoController {
  @Get('top')
  async getTopCryptos() {
    return fetchWithRetry('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=6&tsym=USD', {});
  }

  @Get('history')
  async getHistory(@Query('symbol') symbol: string) {
    return fetchWithRetry(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${symbol}&tsym=USD&limit=24`, {});
  }

  @Get('news')
  async getCryptoNews() {
    return fetchWithRetry('https://min-api.cryptocompare.com/data/v2/news/?lang=EN', {});
  }
} 