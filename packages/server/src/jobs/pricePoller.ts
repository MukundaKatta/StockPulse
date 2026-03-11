import cron from 'node-cron';
import { redis } from '../config/redis';
import * as alphaVantage from '../services/alphaVantage';

const WATCHLIST_KEY = 'sp:polled-symbols';

function isMarketOpen(): boolean {
  const now = new Date();
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = eastern.getDay();
  const hour = eastern.getHours();
  const minute = eastern.getMinutes();
  const timeMinutes = hour * 60 + minute;

  // Monday-Friday, 9:30 AM - 4:00 PM ET
  return day >= 1 && day <= 5 && timeMinutes >= 570 && timeMinutes <= 960;
}

export async function addPolledSymbol(symbol: string): Promise<void> {
  await redis.sadd(WATCHLIST_KEY, symbol.toUpperCase());
}

export async function removePolledSymbol(symbol: string): Promise<void> {
  await redis.srem(WATCHLIST_KEY, symbol.toUpperCase());
}

export function startPricePoller(): void {
  // Poll every 15 seconds during market hours
  cron.schedule('*/15 * * * * *', async () => {
    if (!isMarketOpen()) return;

    const symbols = await redis.smembers(WATCHLIST_KEY);
    if (symbols.length === 0) return;

    // Batch — fetch one at a time to respect rate limits
    for (const symbol of symbols.slice(0, 5)) {
      try {
        const quote = await alphaVantage.getQuote(symbol);
        await redis.publish(
          'sp:prices',
          JSON.stringify({
            symbol: quote.symbol,
            price: quote.price,
            volume: quote.volume,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        console.error(`Price poll failed for ${symbol}:`, (err as Error).message);
      }
    }
  });

  console.log('Price poller started');
}
